import {combineReducers} from 'redux';
import {createReducer} from 'redux-act';

import {actions as storageActions} from 'core/storage';
import {IndexedTracks} from 'models';

import {actions} from './tracks.actions';

export const initialState = {
  data: null as IndexedTracks,
};

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
  })
  .on(storageActions.saveMusic, (state, payload) => {
    return {
      ...state,
      [payload.id]: {...state[payload.id], downloading: true},
    };
  })
  .on(storageActions.saveMusicSuccess, (state, payload) => ({
    ...state,
    [payload]: {...state[payload], downloading: false},
  }));

export type TracksState = typeof initialState;
export const tracks = combineReducers<TracksState>({
  data,
});
