import {getCurrentState} from '../../store';
import {ajax} from 'rxjs/observable/dom/ajax';
import {SERVER_URL} from './api.constants';

export const AjaxRequest = (method, url, data, baseURL = '') => {

  const state = getCurrentState();

  return ajax({
    method,
    timeout: 10000,
    body: data || null,
    responseType: 'json',
    url: baseURL + url,
    headers: {
      'Content-Type': 'application/json'
    }
  });

};

