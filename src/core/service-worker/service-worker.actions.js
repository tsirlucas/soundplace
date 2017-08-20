import {
  INIT_PUSH_MANAGER,
  UPDATE_PUSH_KEY,
  REQUEST_UPDATE_PUSH_KEY,
  REQUEST_PUSH_SUBSCRIPTION
} from './service-worker.constants';

export const initPushManager = () => ({type: INIT_PUSH_MANAGER});
export const requestPushSubscription = ({pushManager}) => ({type: REQUEST_PUSH_SUBSCRIPTION, pushManager});
export const requestUpdatePushKey = (pushKey) => ({type: REQUEST_UPDATE_PUSH_KEY, pushKey});
export const updatePushKey = (pushKey) => ({type: UPDATE_PUSH_KEY, payload: pushKey});
