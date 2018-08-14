import {combineReducers} from 'redux';
import {createReducer} from 'redux-act';

import {User} from 'models';

import {actions} from './user.actions';

export const initialState = {
  data: null as User,
};

const data = createReducer({}, initialState.data)
  .on(actions.setUser, (state, payload) => ({...state, ...payload}))
  .on(actions.setToken, (state, payload) => ({...state, token: payload}))
  .on(actions.import, (state) => ({...state, importing: true}))
  .on(actions.cancelImport, (state) => ({...state, importing: false}));

export type UserState = typeof initialState;
export const user = combineReducers<UserState>({
  data,
});
