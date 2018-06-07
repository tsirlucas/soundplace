import {combineReducers} from 'redux';
import {createReducer} from 'redux-act';

import {IndexedPlaylists} from 'models';

import {actions} from './playlists.actions';

export const initialState = {
  data: null as IndexedPlaylists,
};

const data = createReducer({}, initialState.data).on(
  actions.requestPlaylistsSuccess,
  (_state, payload) => {
    return payload.reduce((curr, next) => {
      curr[next.id] = next;
      return curr;
    }, {});
  },
);

export type PlaylistsState = typeof initialState;
export const playlists = combineReducers<PlaylistsState>({
  data,
});
