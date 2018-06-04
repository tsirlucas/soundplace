import {combineReducers} from 'redux';
import {createReducer} from 'redux-act';

import {actions} from './api.actions';

export const initialState = {
  message: null as string,
  hasNetwork: true,
};

const message = createReducer({}, initialState.message)
  .on(actions.clearError, () => null)
  .on(actions.networkError, () => 'There was a connection problem. Try again.')
  .on(actions.notFoundError, () => 'Request not found. Try again.');

const hasNetwork = createReducer({}, initialState.hasNetwork)
  .on(actions.onOnline, () => true)
  .on(actions.onOffline, () => false);

export type apiState = typeof initialState;
export const api = combineReducers<apiState>({
  message,
  hasNetwork,
});
