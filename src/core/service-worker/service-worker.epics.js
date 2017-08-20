import {combineEpics} from 'redux-observable';
import {Observable} from 'rxjs/Observable';

import {APP_KEY} from './service-worker.constants';
import urlB64ToUint8Array from '../../util/urlB64ToUint8Array';
import {updatePushKey} from '../../core/api/index';
import {
  INIT_PUSH_MANAGER,
  REQUEST_UPDATE_PUSH_KEY,
  REQUEST_PUSH_SUBSCRIPTION
} from './service-worker.constants';

import {
  requestUpdatePushKey,
  requestPushSubscription,
  updatePushKey as updatePushKeyAction

} from './service-worker.actions';

const initPushManagerEpic = (action$) =>
  action$
    .ofType(INIT_PUSH_MANAGER)
    .mergeMap(() => Observable.fromPromise(navigator.serviceWorker.ready)
      .map((reg) => requestPushSubscription(reg)));

const requestPushSubscriptionEpic = (action$) =>
  action$
    .ofType(REQUEST_PUSH_SUBSCRIPTION)
    .mergeMap(({pushManager}) => Observable.fromPromise(pushManager
      .subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlB64ToUint8Array(APP_KEY)
      })).map((pushSubscription) => requestUpdatePushKey(pushSubscription)));

const updatePushKeyEpic = (action$) =>
  action$
    .ofType(REQUEST_UPDATE_PUSH_KEY)
    .mergeMap(({pushKey}) => updatePushKey(pushKey.toJSON())
      .map(() => updatePushKeyAction(pushKey.toJSON())));

export default combineEpics(initPushManagerEpic, requestPushSubscriptionEpic, updatePushKeyEpic);
