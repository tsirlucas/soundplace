import {combineReducers} from 'redux';
import {createReducer} from 'redux-act';

import {IndexedTracks} from 'models';

import {actions} from './player.actions';

export const initialState = {
  list: null as IndexedTracks,
  isPlaying: false,
  currentTime: null as number,
  currentId: null as string,
};

const currentId = createReducer({}, initialState.currentId).on(
  actions.playMusic,
  (_state, payload) => payload,
);

const isPlaying = createReducer({}, initialState.isPlaying)
  .on(actions.playMusic, () => true)
  .on(actions.toggle, (state) => !state);

const currentTime = createReducer({}, initialState.currentTime).on(
  actions.updateTime,
  (_state, payload) => payload,
);

const list = createReducer({}, initialState.list).on(actions.setList, (_state, payload) => payload);

export type PlayerState = typeof initialState;
export const player = combineReducers<PlayerState>({
  list,
  currentId,
  isPlaying,
  currentTime,
});
