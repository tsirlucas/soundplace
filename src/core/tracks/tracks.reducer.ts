import {combineReducers} from 'redux';
import {createReducer} from 'redux-act';

import {actions as storageActions} from 'core/storage';
import {IndexedTracks} from 'models';

import {actions} from './tracks.actions';

export const initialState = {
  listInfo: {
    id: null as string,
    name: null as string,
    cover: null as string,
  },
  data: null as IndexedTracks,
};

const data = createReducer({}, initialState.data)
  .on(actions.requestTracksSuccess, (_state, payload) => {
    return payload.tracks.reduce((curr, next) => {
      curr[next.spotify_id] = next;
      return curr;
    }, {});
  })
  .on(storageActions.saveMusic, (state, payload) => {
    return {
      ...state,
      [payload.spotify_id]: {...state[payload.spotify_id], downloading: true},
    };
  })
  .on(storageActions.saveMusicSuccess, (state, payload) => ({
    ...state,
    [payload]: {...state[payload], downloading: false},
  }));

const listInfo = createReducer({}, initialState.listInfo).on(
  actions.requestTracksSuccess,
  (_state, {tracks: _, ...rest}) => rest,
);

export type TracksState = typeof initialState;
export const tracks = combineReducers<TracksState>({
  data,
  listInfo,
});
