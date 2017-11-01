import { Observable } from '../../util/RXImports';

const CACHE_ID = 'SOUNDPLACE_CACHE';

const appCachePromise = window.caches ? window.caches.open(CACHE_ID) :

  // Mocking cache to avoid errors on safari
  new Promise((resolve) => resolve({
    put: () => null,
    match: () => new Promise((resolve) => {
      resolve(undefined);
    })
  }));

export const set = (key, response) =>
  appCachePromise.then((cache) => cache.put(key, response));

export const get = (key) =>
  appCachePromise.then((cache) => cache.match(key));

export const createCleanResponse = (originalResponse) =>
  new Response(new Blob([JSON.stringify(originalResponse)]), originalResponse);

export const getCleanResponse = (requestKey) =>
  Observable.fromPromise(get(requestKey))
    .filter((value) => value !== undefined)
    .mergeMap((res) => Observable.fromPromise(res.json()));


