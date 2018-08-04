import {combineReducers} from 'redux';
import {createReducer} from 'redux-act';

import {IndexedPlaylists} from 'models';

import {actions} from './playlists.actions';

export const initialState = {
  data: null as IndexedPlaylists,
};

const data = createReducer({}, initialState.data)
  .on(actions.setPlaylists, (_state, payload) => {
    return payload.item.reduce((curr, next) => {
      curr[next.id] = next;
      return curr;
    }, {});
  })
  .on(actions.addPlaylist, (state, payload) => ({...state, [payload.item.id]: payload.item}))
  .on(actions.updatePlaylist, (state, payload) => ({...state, [payload.item.id]: payload.item}))
  .on(actions.removePlaylist, (state, payload) => {
    return Object.keys(state)
      .filter((key) => key !== payload.item.id)
      .reduce((result, current) => {
        result[current] = state[current];
        return result;
      }, {});
  });

export type PlaylistsState = typeof initialState;
export const playlists = combineReducers<PlaylistsState>({
  data,
});
