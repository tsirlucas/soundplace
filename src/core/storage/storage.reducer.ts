import {createReducer} from 'redux-act';

import {StoragedTrackRequest} from 'models';

import {actions} from './storage.actions';

const initialStorageInfo = {
  usage: 0,
  quota: 0,
  free: 0,
  songs: 0,
  appResources: 0,
};

export const initialState = {
  cachedSongs: null as StoragedTrackRequest[],
  storageInfo: initialStorageInfo,
};

const data = createReducer({}, initialState)
  .on(actions.loadStorageStatusSuccess, (state, payload) => ({
    ...state,
    storageInfo: {
      usage: payload.usage,
      quota: payload.quota,
      songs: payload.usage,
      free: payload.quota - payload.usage,
      appResources: state.storageInfo.appResources || payload.usage,
    },
  }))
  .on(actions.requestCachedSongsSuccess, (state, payload) => ({
    cachedSongs: payload,
    storageInfo: {
      ...state.storageInfo,
      appResources: payload.reduce((prev, curr) => {
        return prev - curr.data.sizeValue;
      }, state.storageInfo.usage),
      songs: payload.reduce((prev, curr) => {
        return prev + curr.data.sizeValue;
      }, 0),
    },
  }));

export type StorageState = typeof initialState;
export const storage = data;
