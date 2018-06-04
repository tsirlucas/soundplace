import {combineReducers} from 'redux';
import {createReducer} from 'redux-act';

import {User} from 'models';

import {actions} from './user.actions';

export const initialState = {
  data: null as User,
};

const data = createReducer({}, initialState.data).on(
  actions.requestUserSuccess,
  (_state, payload) => payload,
);

export type UserState = typeof initialState;
export const user = combineReducers<UserState>({
  data,
});
