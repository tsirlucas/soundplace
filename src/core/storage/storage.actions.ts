import {createAction} from 'redux-act';

import {Estimate, StoragedTrackRequest, Track} from 'models';

export const actions = {
  loadStorageStatus: createAction('storage/LOAD_STORAGE_STATUS'),
  loadStorageStatusSuccess: createAction<Estimate>('storage/LOAD_STORAGE_STATUS_SUCCESS'),
  requestCachedSongs: createAction('storage/GET_CACHED_SONGS'),
  requestCachedSongsSuccess: createAction<StoragedTrackRequest[]>(
    'storage/GET_CACHED_SONGS_SUCCESS',
  ),
  saveMusic: createAction<Track>('storage/SAVE_MUSIC'),
  saveMusicSuccess: createAction<string>('storage/SAVE_MUSIC_SUCCESS'),
  deleteMusic: createAction<string>('storage/DELETE_MUSIC'),
};

type ActionsType = typeof actions;
export type Actions = {[P in keyof ActionsType]: ReturnType<ActionsType[P]>};
