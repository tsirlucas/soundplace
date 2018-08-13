import {combineReducers} from 'redux';
import {createReducer} from 'redux-act';

import {actions} from './api.actions';

export const initialState = {
  message: null as string,
  hasNetwork: '',
};

const message = createReducer({}, initialState.message)
  .on(actions.clearError, () => null)
  .on(actions.networkError, () => 'There was a connection problem. Try again.')
  .on(actions.notFoundError, () => 'Request not found. Try again.');

const hasNetwork = createReducer({}, initialState.hasNetwork)
  .on(actions.onOnline, () => 'YES')
  .on(actions.onOffline, () => 'NO');

export type apiState = typeof initialState;
export const api = combineReducers<apiState>({
  message,
  hasNetwork,
});
