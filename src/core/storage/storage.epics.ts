import {combineEpics} from 'redux-observable';
import {Epic} from 'redux-observable';
import {concat, empty, from, Observable, of, throwError} from 'rxjs';
import {map, mergeMap, take, takeUntil} from 'rxjs/operators';

import {RootState} from 'core';
import {actions as tracksActions} from 'core/tracks';
import {StoragedNavigator, StoragedTrack, StoragedTrackRequest} from 'models';

// import {formatBytes} from '../../util/formatBytes';
import {STREAM_SERVER_URL} from '../api/api.constants';
import {Actions} from '../rootActions';
import {actions} from './storage.actions';

const estimateStorage = () => {
  const nav = window.navigator as StoragedNavigator;

  if (nav.storage) {
    return from(nav.storage.estimate());
  }

  return throwError(new Error("Browser doesn't support Storage API"));
};

// TODO Better small functions
const getCachesKeys = () => (window.caches ? from(caches.keys()) : empty());
const getCaches = (keys) =>
  from(Promise.all(keys.map((cacheKey: string) => caches.open(cacheKey))));
const getCacheRequests = (cachesRes) => from(Promise.all(cachesRes.map((cache) => cache.keys())));
const deleteCacheRequests = (cachesRes, url: string) =>
  from(Promise.all(cachesRes.map((cache) => cache.delete(url, {ignoreSearch: true}))));
const concatRequests = (cachesReq) => cachesReq.reduce((prev, curr) => prev.concat(curr), []);
const filterSongsReq = (requests) => requests.filter(({url}) => url.includes(STREAM_SERVER_URL));

//TODO: split this in small functions
const parseSongs = (requests) =>
  from(
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
  return from(
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

const $getCachedSongs = () =>
  getCachesKeys().pipe(
    mergeMap(getCaches),
    mergeMap(getCacheRequests),
    map(concatRequests),
    map(filterSongsReq),
    map(parseSongs),
  );

const createCachedSongsProducer = () => {
  const value = $getCachedSongs;
  let cb: Function;

  const emit = () => {
    if (cb) cb(value());
    return empty();
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
  cachedSongsProducer.subscribe((observable: Observable<Observable<StoragedTrackRequest[]>>) =>
    observable.subscribe((res) => res.pipe(map((arr) => observer.next(arr))).subscribe()),
  );
});

type EpicActions =
  | Actions['loadStorageStatus']
  | Actions['loadStorageStatusSuccess']
  | Actions['subscribeCachedSongs']
  | Actions['requestCachedSongsSuccess']
  | Actions['subscribeToSavedTracks'];

const storageEpic: Epic<EpicActions, Actions['loadStorageStatusSuccess'], RootState> = (action$) =>
  action$.ofType(actions.loadStorageStatus.getType()).pipe(
    estimateStorage,
    map(actions.loadStorageStatusSuccess),
  );

const cachedSongsEpic: Epic<
  EpicActions,
  Actions['requestCachedSongsSuccess'] | Actions['subscribeToSavedTracks'],
  RootState
> = (action$, $state) =>
  action$.ofType(actions.subscribeCachedSongs.getType()).pipe(
    mergeMap(() =>
      $cachedSongsObservable.pipe(
        mergeMap((requests) =>
          $state.pipe(
            take(1),
            mergeMap((state) => {
              const songsToSubs = [
                ...requests.map((item) => item.data.id),
                ...Object.keys(state.tracks.saved),
              ].filter((item, pos, self) => self.indexOf(item) === pos);

              return concat(
                of(actions.requestCachedSongsSuccess(requests)),
                songsToSubs.length
                  ? of(tracksActions.subscribeToSavedTracks(songsToSubs))
                  : empty(),
              );
            }),
          ),
        ),
        takeUntil(action$.ofType(actions.unsubscribeCachedSongs.getType())),
      ),
    ),
  );

const saveMusicEpic: Epic<Actions['saveMusic'], undefined, RootState> = (action$) =>
  action$
    .ofType(actions.saveMusic.getType())
    .pipe(
      mergeMap(({payload}: Actions['saveMusic']) =>
        fetchMusic(payload.id).pipe(mergeMap(cachedSongsProducer.emit)),
      ),
    );

const deleteMusicEpic: Epic<EpicActions, Actions['loadStorageStatus'], RootState> = (action$) =>
  action$.ofType(actions.deleteMusic.getType()).pipe(
    mergeMap(({payload}) =>
      getCachesKeys().pipe(
        mergeMap(getCaches),
        mergeMap((cacheRes) => deleteCacheRequests(cacheRes, `${STREAM_SERVER_URL}/${payload}`)),
        mergeMap(() => concat(cachedSongsProducer.emit(), of(actions.loadStorageStatus()))),
      ),
    ),
  );

export default combineEpics(storageEpic, cachedSongsEpic, saveMusicEpic, deleteMusicEpic);
