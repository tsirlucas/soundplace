import {combineEpics} from 'redux-observable';
import {Epic} from 'redux-observable';
import {Observable} from 'rxjs';

import {RootState} from 'core';
import {actions as tracksActions} from 'core/tracks';
import {StoragedNavigator, StoragedTrack, StoragedTrackRequest} from 'models';

// import {formatBytes} from '../../util/formatBytes';
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
  Observable.fromPromise(
    Promise.all(cachesRes.map((cache) => cache.delete(url, {ignoreSearch: true}))),
  );
const concatRequests = (cachesReq) => cachesReq.reduce((prev, curr) => prev.concat(curr), []);
const filterSongsReq = (requests) => requests.filter(({url}) => url.includes(STREAM_SERVER_URL));

//TODO: split this in small functions
const parseSongs = (requests): Observable<StoragedTrackRequest[]> =>
  Observable.fromPromise(
    Promise.all<StoragedTrackRequest>(
      requests.map((item) => {
        const splitted = item.url.split('/');
        const last = splitted[splitted.length - 1];
        const id = last.split('?')[0];
        return {
          request: item,
          data: {
            id,
            size: 'Not available', // formatBytes(blob.size),
            sizeValue: 0, // blob.size,
          } as StoragedTrack,
        };
      }),
    ),
  );

const fetchMusic = (id: string) => {
  return Observable.fromPromise(
    new Promise((res) => {
      const audio = new Audio(
        `${STREAM_SERVER_URL}/${id}?save=true&cacheBursting=${new Date().getTime()}`,
      );
      audio.playbackRate = 16.0;
      audio.muted = true;
      audio.play();
      audio.onended = () => {
        audio.removeAttribute('src');
        audio.load();
        res();
      };
    }),
  );
};

const storageEpic: Epic<ActionsValues, RootState> = (action$) =>
  action$
    .ofType(actions.loadStorageStatus.getType())
    .mergeMap(estimateStorage)
    .map(actions.loadStorageStatusSuccess);

const $getCachedSongs = () =>
  getCachesKeys()
    .mergeMap(getCaches)
    .mergeMap(getCacheRequests)
    .map(concatRequests)
    .map(filterSongsReq)
    .map(parseSongs);

const createCachedSongsProducer = () => {
  const value = $getCachedSongs;
  let cb: Function;

  const emit = () => {
    if (cb) cb(value());
    return Observable.empty<never>();
  };

  const subscribe = (cbFunc: Function) => {
    cb = cbFunc;
    emit();
  };

  return {
    emit,
    subscribe,
  };
};

const cachedSongsProducer = createCachedSongsProducer();

const $cachedSongsObservable: Observable<StoragedTrackRequest[]> = Observable.create((observer) => {
  cachedSongsProducer.subscribe((observable) =>
    observable.subscribe((res) => res.map((arr) => observer.next(arr)).subscribe()),
  );
});

const cachedSongsEpic: Epic<ActionsValues, RootState> = (action$, store) =>
  action$.ofType(actions.subscribeCachedSongs.getType()).mergeMap(() =>
    $cachedSongsObservable
      .mergeMap((requests) => {
        const songsToSubs = [
          ...requests.map((item) => item.data.id),
          ...Object.keys(store.getState().tracks.saved),
        ].filter((item, pos, self) => self.indexOf(item) === pos);

        return Observable.concat(
          Observable.of(actions.requestCachedSongsSuccess(requests)),
          songsToSubs.length
            ? Observable.of(tracksActions.subscribeToSavedTracks(songsToSubs))
            : Observable.empty<never>(),
        );
      })
      .takeUntil(action$.ofType(actions.unsubscribeCachedSongs.getType())),
  );

const saveMusicEpic: Epic<ActionsValues, RootState> = (action$) =>
  action$
    .ofType(actions.saveMusic.getType())
    .mergeMap(({payload}: Actions['saveMusic']) =>
      fetchMusic(payload.id).mergeMap(cachedSongsProducer.emit),
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
