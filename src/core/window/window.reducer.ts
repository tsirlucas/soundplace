import {createReducer} from 'redux-act';

import {actions} from './window.actions';

export const initialState = {
  height: null as number,
  width: null as number,
  scrollbarWidth: null as number,
};

const data = createReducer({}, initialState).on(actions.onResize, (_state, payload) => ({
  height: payload.innerHeight,
  width: payload.innerWidth,
  scrollbarWidth: payload.scrollbarWidth,
}));

export type WindowState = typeof initialState;
export const window = data;
