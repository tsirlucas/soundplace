import { CLEAR_ERROR, ON_ONLINE, ON_OFFLINE } from './api.constants';

export const clearError = () => ({
  type: CLEAR_ERROR
});

export const onOnline = (ev) => ({
  type: ON_ONLINE
});

export const onOffline = (ev) => ({
  type: ON_OFFLINE
});
