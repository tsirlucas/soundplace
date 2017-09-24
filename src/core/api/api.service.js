import Cookie from 'js-cookie';
import { ajax } from 'rxjs/observable/dom/ajax';

import { getCurrentState } from '../../store';
import { SERVER_URL } from './api.constants';

export const AjaxRequest = (method, url, data) => {

  const state = getCurrentState();
  const token = Cookie.get('token');

  return ajax({
    method,
    timeout: 10000,
    body: data || null,
    responseType: 'json',
    url: SERVER_URL + url,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

};

export const importUserData = () => AjaxRequest('POST', '/api/me/import');

export const getPlaylists = () => AjaxRequest('GET', '/api/me/playlists');
