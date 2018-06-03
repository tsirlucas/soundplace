import {createReducer} from 'redux-act';

import {actions} from './router.actions';

export const initialState = {
  path: '/',
  action: 'replace',
};

const data = createReducer({}, initialState)
  .on(actions.changeRoute, (_state, payload) => ({
    path: payload,
    action: 'push',
  }))
  .on(actions.replaceRoute, (_state, payload) => ({
    path: payload,
    action: 'replace',
  }))
  .on(actions.prevRoute, () => ({
    path: '*',
    action: 'push',
  }));

export type Routerstate = typeof initialState;
export const router = data;
