import {combineEpics} from 'redux-observable';
import {Epic} from 'redux-observable';
import {Observable} from 'rxjs';

import {RootState} from 'core';
import {actions as tracksActions} from 'core/tracks';
import {StoragedNavigator, StoragedTrack, StoragedTrackRequest} from 'models';

import {formatBytes} from '../../util/formatBytes';
import {STREAM_SERVER_URL} from '../api/api.constants';
import {Actions, ActionsValues} from '../rootActions';
import {actions} from './storage.actions';

const estimateStorage = () => {
  const nav = window.navigator as StoragedNavigator;

  if (nav.storage) {
    return Observable.fromPromise(nav.storage.estimate());
  }

  return Observable.throw(new Error("Browser doesn't support Storage API"));
};

// TODO Better small functions
const getCachesKeys = () => Observable.fromPromise(caches.keys());
const getCaches = (keys) =>
  Observable.fromPromise(Promise.all(keys.map((cacheKey: string) => caches.open(cacheKey))));
const getCacheRequests = (cachesRes) =>
  Observable.fromPromise(Promise.all(cachesRes.map((cache) => cache.keys())));
const deleteCacheRequests = (cachesRes, url: string) =>
  Observable.fromPromise(Promise.all(cachesRes.map((cache) => cache.delete(url))));
const concatRequests = (cachesReq) => cachesReq.reduce((prev, curr) => prev.concat(curr), []);
const filterSongsReq = (requests) => requests.filter(({url}) => url.includes(STREAM_SERVER_URL));

//TODO: split this in small functions
const parseSongs = (requests): Observable<StoragedTrackRequest[]> =>
  Observable.fromPromise(
    Promise.all<StoragedTrackRequest>(
      requests.map((item) =>
        fetch(item.url)
          .then((res) => res.blob())
          .then((blob) => {
            const splitted = item.request.url.split('/');
            const id = splitted[splitted.length - 1];
            return {
              request: item,
              data: {
                id,
                size: formatBytes(blob.size),
                sizeValue: blob.size,
              } as StoragedTrack,
            };
          }),
      ),
    ),
  );

const getReadableStreamValue = (rStream) => {
  const reader = rStream.getReader();
  const read = () =>
    reader.read().then(({value, done}) => {
      return done ? value : read();
    });
  return read();
};

const fetchMusic = (id: string) =>
  Observable.fromPromise(
    // temporary
    fetch(`${STREAM_SERVER_URL}/${id}`, {
      headers: {save: 'true'},
    }),
  ).mergeMap((res) => {
    return Observable.fromPromise(getReadableStreamValue(res.body));
  });

const storageEpic: Epic<ActionsValues, RootState> = (action$) =>
  action$
    .ofType(actions.loadStorageStatus.getType())
    .mergeMap(estimateStorage)
    .map(actions.loadStorageStatusSuccess);

const $getCachedSongs = getCachesKeys()
  .mergeMap(getCaches)
  .mergeMap(getCacheRequests)
  .map(concatRequests)
  .map(filterSongsReq)
  .map(parseSongs);

const createCachedSongsProducer = () => {
  const value = $getCachedSongs;
  let cb: Function;

  const emit = () => {
    if (cb) cb(value);
    return Observable.empty<never>();
  };

  return {
    emit,
    subscribe: (cbFunc: Function) => (cb = cbFunc),
  };
};

const cachedSongsProducer = createCachedSongsProducer();

const $cachedSongsObservable: Observable<StoragedTrackRequest[]> = Observable.create((observer) => {
  cachedSongsProducer.subscribe((observable) => {
    observable.subscribe(observer.next);
  });
});

const cachedSongsEpic: Epic<ActionsValues, RootState> = (action$) =>
  action$
    .ofType(actions.subscribeCachedSongs.getType())
    .mergeMap(() =>
      $cachedSongsObservable.mergeMap((requests) =>
        Observable.concat(
          Observable.of(actions.requestCachedSongsSuccess(requests)),
          Observable.of(tracksActions.subscribeToTracksIds(requests.map((item) => item.data.id))),
        ),
      ),
    )
    .takeUntil(action$.ofType(actions.unsubscribeCachedSongs.getType()));

const saveMusicEpic: Epic<ActionsValues, RootState> = (action$) =>
  action$
    .ofType(actions.saveMusic.getType())
    .mergeMap(({payload}: Actions['saveMusic']) =>
      fetchMusic(payload.id).mergeMap(() => cachedSongsProducer.emit()),
    );

const deleteMusicEpic: Epic<ActionsValues, RootState> = (action$) =>
  action$.ofType(actions.deleteMusic.getType()).mergeMap(({payload}) =>
    getCachesKeys()
      .mergeMap(getCaches)
      .mergeMap((cacheRes) => deleteCacheRequests(cacheRes, `${STREAM_SERVER_URL}/${payload}`))
      .mergeMap(() =>
        Observable.concat(cachedSongsProducer.emit(), Observable.of(actions.loadStorageStatus())),
      ),
  );

export default combineEpics(storageEpic, cachedSongsEpic, saveMusicEpic, deleteMusicEpic);
