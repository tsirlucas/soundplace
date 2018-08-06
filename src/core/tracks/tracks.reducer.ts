import {combineReducers} from 'redux';
import {createReducer} from 'redux-act';

import {actions as storageActions} from 'core/storage';
import {IndexedTracks} from 'models';

import {actions} from './tracks.actions';

export const initialState = {
  data: {} as IndexedTracks,
  saved: {} as {
    [index: string]: {status: 'DOWNLOADING' | 'DONE'; size?: number; sizeValue?: string};
  },
  playlist: {} as {
    [index: string]: true;
  },
};

const saved = createReducer({}, initialState.saved)
  .on(storageActions.saveMusic, (state, payload) => {
    return {
      ...state,
      [payload.id]: {status: 'DOWNLOADING'},
    };
  })
  .on(storageActions.requestCachedSongsSuccess, (_state, payload) => ({
    ...payload.reduce((curr, next) => {
      curr[next.data.id] = {status: 'DONE', size: next.data.size, sizeValue: next.data.sizeValue};
      return curr;
    }, {}),
  }));

const data = createReducer({}, initialState.data)
  .on(actions.setTracks, (state, payload) => ({
    ...payload.keep.reduce((curr, next) => {
      curr[next] = state[next];
      return curr;
    }, {}),
    ...payload.item.reduce((curr, next) => {
      curr[next.id] = next;
      return curr;
    }, {}),
  }))
  .on(actions.addTrack, (state, payload) => ({...state, [payload.item.id]: payload.item}))
  .on(actions.updateTrack, (state, payload) => ({...state, [payload.item.id]: payload.item}));

const playlist = createReducer({}, initialState.playlist)
  .on(actions.setTracks, (state, payload) => {
    if (payload.type === 'playlist') {
      return payload.item.reduce((curr, next) => {
        curr[next.id] = true;
        return curr;
      }, {});
    }
    return state;
  })
  .on(actions.removeTrack, (state, payload) => {
    return Object.keys(state)
      .filter((key) => key !== payload.item.id)
      .reduce((result, current) => {
        result[current] = state[current];
        return result;
      }, {});
  });

export type TracksState = typeof initialState;
export const tracks = combineReducers<TracksState>({
  data,
  saved,
  playlist,
});
