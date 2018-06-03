import {Observable} from 'rxjs';

export class CacheService {
  private static instance: CacheService;
  private CACHE_ID = 'SOUNDPLACE_CACHE';
  private appCacheOpener: () => Promise<Cache>;

  constructor() {
    this.appCacheOpener = () =>
      window.caches
        ? window.caches.open(this.CACHE_ID)
        : // Mocking cache to avoid errors on safari
          new Promise((resolve) =>
            resolve({
              keys: () => new Promise((res) => res(null as Request[])),
              add: () => new Promise((res) => res(null as void)),
              addAll: () => new Promise((res) => res(null as void)),
              put: () => new Promise((res) => res(null as void)),
              delete: () => new Promise((res) => res(null as boolean)),
              match: () => new Promise((res) => res(null as Response)),
              matchAll: () => new Promise((res) => res(null as Response[])),
            } as Cache),
          );
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new CacheService();
    }

    return this.instance;
  }

  public get(key: string) {
    const promise = this.appCacheOpener().then((cache: Cache) => cache.match(key));

    return Observable.fromPromise(promise)
      .filter((value: Response) => value !== undefined)
      .mergeMap((res: Response) => Observable.fromPromise(res.json()));
  }

  public set(key: string, response: Response) {
    const cleanResponse = new Response(new Blob([JSON.stringify(response)]), response);
    return this.appCacheOpener().then((cache) => cache.put(key, cleanResponse));
  }
}
