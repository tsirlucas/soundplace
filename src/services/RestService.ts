import {Observable} from 'rxjs';
import {ajax} from 'rxjs/observable/dom/ajax';

import {CacheService} from './CacheService';

interface Options {
  endpoint: string;
  baseUrl: string;
  token: string;
}

export enum Method {
  GET = 'GET',
  POST = 'POST',
}

export abstract class RestService {
  private options: Options;
  constructor(options: Options) {
    this.options = options;
  }

  protected request(method: Method, endpoint: string, payload?: Body) {
    const url = this.options.baseUrl + endpoint;
    const requestKey = `${url}_${JSON.stringify(payload)}`;

    const fromCache = () => CacheService.getInstance().get(requestKey);

    if (!window.navigator.onLine) return fromCache();

    const fromNetwork = () =>
      ajax({
        method,
        timeout: 10000,
        body: payload || null,
        responseType: 'json',
        url: url,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.options.token}`,
        },
      })
        .catch((err) => {
          console.log('Ajax error, retrying...');
          return Observable.throw(err);
        })
        .retry(3)
        .map((res: Response) => {
          if (method === 'GET') {
            CacheService.getInstance().set(requestKey, res);
          }
          return res;
        });

    return Observable.concat(fromCache(), fromNetwork()).map((result) => result.response.data);
  }

  public get() {
    return this.request(Method.GET, this.options.endpoint);
  }
}
