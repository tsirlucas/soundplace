import Cookie from 'js-cookie';
import { Observable } from '../../util/RXImports';
import { ajax } from 'rxjs/observable/dom/ajax';

import * as AppCache from './api.cache.service';
import { getCurrentState } from '../../store';
import { SERVER_URL } from './api.constants';

export const AjaxRequest = (method, url, data = null) => {

  const { api } = getCurrentState();
  const token = Cookie.get('token');
  const requestKey = `${url}_${JSON.stringify(data)}`;

  if (api.hasNetwork === false) return AppCache.getCleanResponse(requestKey);

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
        AppCache.set(requestKey, AppCache.createCleanResponse(res));
      }
      return res;
    });

  return Observable.concat(
    AppCache.getCleanResponse(requestKey),
    request()
  );
};

export const importUserData = () => AjaxRequest('POST', '/api/me/import');

export const getUser = () => AjaxRequest('GET', '/api/me');

export const getPlaylists = () => AjaxRequest('GET', '/api/me/playlists');

export const getArtists = () => AjaxRequest('GET', '/api/me/artists');

export const getSongs = ({entity, id}) => AjaxRequest('GET', `/api/${entity}/${id}/tracks`);
