import { combineEpics } from 'redux-observable';

import { Observable } from '../../util/RXImports';
import { formatBytes } from '../../util/formatBytes';
import { STREAM_SERVER_URL } from '../api/api.constants';
import { LOAD_STORAGE_STATUS, GET_CACHED_SONGS, SAVE_MUSIC, DELETE_MUSIC } from './storage.constants';
import {
  loadStorageStatus, loadStorageStatusSuccess,
  getCachedSongs, getCachedSongsSuccess,
  saveMusicSuccess
} from './storage.actions';

const estimateStorage = () => {
  if (navigator.storage) {
    return Observable.fromPromise(navigator.storage.estimate());
  }

  return Observable.throw(new Error('Browser doesn\'t support Storage API'));
};

// TODO Better small functions
const getCachesKeys = () => Observable.fromPromise(caches.keys());
const getCaches = (keys) => Observable.fromPromise(Promise.all(keys.map((cacheKey) => caches.open(cacheKey))));
const getCacheRequests = (cachesRes) => Observable.fromPromise(Promise.all(cachesRes.map((cache) => cache.keys())));
const deleteCacheRequests = (cachesRes, url) => Observable.fromPromise(Promise.all(cachesRes.map((cache) => cache.delete(url))));
const concatRequests = (cachesReq) => cachesReq.reduce((prev, curr) => (prev.concat(curr)), []);
const filterSongsReq = (requests) => requests.filter(({ url }) => url.includes(STREAM_SERVER_URL));

//TODO: split this in small functions
const parseSongs = (requests) => Observable.fromPromise(
  Promise.all(requests.map((item) =>
    fetch(item.url)
      .then((res) => res.blob())
      .then((blob) => ({
        request: item,
        data: {
          ...JSON.parse(item.headers.get('Data')),
          size: formatBytes(blob.size),
          sizeValue: blob.size
        }
      })))));


const fetchMusic = (track) => Observable.fromPromise(
  // temporary
  fetch(`${STREAM_SERVER_URL}${track.name} - ${track.artist.name} - official audio`,
    { headers: { save: true, data: JSON.stringify(track) } }));

const storageEpic = (action$) =>
  action$.ofType(LOAD_STORAGE_STATUS)
    .mergeMap(estimateStorage)
    .map(loadStorageStatusSuccess);

const cachedSongsEpic = (action$) =>
  action$.ofType(GET_CACHED_SONGS)
    .mergeMap(getCachesKeys)
    .mergeMap(getCaches)
    .mergeMap(getCacheRequests)
    .map(concatRequests)
    .map(filterSongsReq)
    .mergeMap((songs) => parseSongs(songs)
      .map(getCachedSongsSuccess));

const saveMusicEpic = (action$) =>
  action$.ofType(SAVE_MUSIC)
    .mergeMap(({ payload }) => fetchMusic(payload.track)
      .map(() => saveMusicSuccess(payload)));

const deleteMusicEpic = (action$) =>
  action$.ofType(DELETE_MUSIC)
    .mergeMap(({ payload }) => getCachesKeys()
      .mergeMap(getCaches)
      .mergeMap((cacheRes) => deleteCacheRequests(cacheRes, payload))
      .mergeMap(() => Observable.concat(
        Observable.of(loadStorageStatus()),
        Observable.of(getCachedSongs())
      )));

export default combineEpics(storageEpic, cachedSongsEpic, saveMusicEpic, deleteMusicEpic);
