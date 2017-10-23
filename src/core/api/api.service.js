import Cookie from 'js-cookie';
import { Observable } from '../../util/RXImports';
import { ajax } from 'rxjs/observable/dom/ajax';

import { getCurrentState } from '../../store';
import { SERVER_URL } from './api.constants';

const secure = process.env.NODE_ENV === 'production';

export const AjaxRequest = (method, url, data = null) => {

  const { api } = getCurrentState();
  const token = Cookie.get('token');
  const cached = Cookie.get(`${url}_${JSON.stringify(data)}`);

  if (api.hasNetwork === false) return cached ?
    Observable.of(JSON.parse(cached)) : Observable.empty();

  const request = () => ajax({
    method,
    timeout: 10000,
    body: data || null,
    responseType: 'json',
    url: SERVER_URL + url,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
    .catch((err) => {
      console.log('Ajax error, retrying...');
      return Observable.throw(err);
    })
    .retry(3)
    .map((res) => {
      if (method === 'GET') {
        Cookie.set(`${url}_${JSON.stringify(data)}`, JSON.stringify(res), { secure });
      }
      return res;
    });

  if (cached) {
    return Observable.concat(
      Observable.of(JSON.parse(cached)),
      request()
    );
  }

  return request();

};

export const importUserData = () => AjaxRequest('POST', '/api/me/import');

export const getUser = () => AjaxRequest('GET', '/api/me');

export const getPlaylists = () => AjaxRequest('GET', '/api/me/playlists');

export const getArtists = () => AjaxRequest('GET', '/api/me/artists');