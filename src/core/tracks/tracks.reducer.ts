import {combineReducers} from 'redux';
import {createReducer} from 'redux-act';

import {actions as storageActions} from 'core/storage';
import {IndexedTracks} from 'models';

import {actions} from './tracks.actions';

export const initialState = {
  data: null as IndexedTracks,
  saved: {} as {
    [index: string]: {status: 'DOWNLOADING' | 'DONE'; size?: number; sizeValue?: string};
  },
};

const saved = createReducer({}, initialState.saved)
  .on(storageActions.saveMusic, (state, payload) => {
    return {
      ...state,
      [payload.id]: {status: 'DOWNLOADING'},
    };
  })
  .on(storageActions.requestCachedSongsSuccess, (state, payload) => ({
    ...state,
    ...payload.reduce((curr, next) => {
      const splitted = next.request.url.split('/');
      const key = splitted[splitted.length - 1];
      curr[key] = {status: 'DONE', size: next.data.size, sizeValue: next.data.sizeValue};
      return curr;
    }, {}),
  }));

const data = createReducer({}, initialState.data)
  .on(actions.setTracks, (_state, payload) => {
    return payload.item.reduce((curr, next) => {
      curr[next.id] = next;
      return curr;
    }, {});
  })
  .on(actions.addTrack, (state, payload) => ({...state, [payload.item.id]: payload.item}))
  .on(actions.updateTrack, (state, payload) => ({...state, [payload.item.id]: payload.item}))
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
});
