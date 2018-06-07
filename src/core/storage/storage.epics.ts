import {combineEpics} from 'redux-observable';
import {Epic} from 'redux-observable';
import {Observable} from 'rxjs';

import {RootState} from 'core';
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
  Observable.fromPromise(Promise.all(keys.map((cacheKey) => caches.open(cacheKey))));
const getCacheRequests = (cachesRes) =>
  Observable.fromPromise(Promise.all(cachesRes.map((cache) => cache.keys())));
const deleteCacheRequests = (cachesRes, url) =>
  Observable.fromPromise(Promise.all(cachesRes.map((cache) => cache.delete(url))));
const concatRequests = (cachesReq) => cachesReq.reduce((prev, curr) => prev.concat(curr), []);
const filterSongsReq = (requests) => requests.filter(({url}) => url.includes(STREAM_SERVER_URL));

//TODO: split this in small functions
const parseSongs = (requests) =>
  Observable.fromPromise(
    Promise.all<StoragedTrackRequest>(
      requests.map((item) =>
        fetch(item.url)
          .then((res) => res.blob())
          .then((blob) => ({
            request: item,
            data: {
              ...JSON.parse(item.headers.get('Data')),
              size: formatBytes(blob.size),
              sizeValue: blob.size,
            } as StoragedTrack,
          })),
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

const fetchMusic = (track) =>
  Observable.fromPromise(
    // temporary
    fetch(`${STREAM_SERVER_URL}/${track.name} - ${track.artist.name} - official audio`, {
      headers: {save: 'true', data: JSON.stringify(track)},
    }),
  ).mergeMap((res) => {
    return Observable.fromPromise(getReadableStreamValue(res.body));
  });

const storageEpic: Epic<ActionsValues, RootState> = (action$) =>
  action$
    .ofType(actions.loadStorageStatus.getType())
    .mergeMap(estimateStorage)
    .map(actions.loadStorageStatusSuccess);

const cachedSongsEpic: Epic<ActionsValues, RootState> = (action$) =>
  action$
    .ofType(actions.requestCachedSongs.getType())
    .mergeMap(getCachesKeys)
    .mergeMap(getCaches)
    .mergeMap(getCacheRequests)
    .map(concatRequests)
    .map(filterSongsReq)
    .mergeMap((songs) => parseSongs(songs).map(actions.requestCachedSongsSuccess));

const saveMusicEpic: Epic<ActionsValues, RootState> = (action$) =>
  action$
    .ofType(actions.saveMusic.getType())
    .mergeMap(({payload}: Actions['saveMusic']) =>
      fetchMusic(payload).mapTo(actions.saveMusicSuccess(payload.spotify_id)),
    );

const deleteMusicEpic: Epic<ActionsValues, RootState> = (action$) =>
  action$.ofType(actions.deleteMusic.getType()).mergeMap(({payload}) =>
    getCachesKeys()
      .mergeMap(getCaches)
      .mergeMap((cacheRes) => deleteCacheRequests(cacheRes, payload))
      .mergeMap(() =>
        Observable.concat(
          Observable.of(actions.loadStorageStatus()),
          Observable.of(actions.requestCachedSongs()),
        ),
      ),
  );

export default combineEpics(storageEpic, cachedSongsEpic, saveMusicEpic, deleteMusicEpic);
