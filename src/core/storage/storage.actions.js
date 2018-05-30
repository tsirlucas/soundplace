import {
  LOAD_STORAGE_STATUS,
  LOAD_STORAGE_STATUS_SUCCESS,
  GET_CACHED_SONGS,
  GET_CACHED_SONGS_SUCCESS,
  SAVE_MUSIC,
  SAVE_MUSIC_SUCCESS,
  DELETE_MUSIC,
} from './storage.constants';

export const loadStorageStatus = () => ({type: LOAD_STORAGE_STATUS});

export const loadStorageStatusSuccess = (estimate) => ({
  type: LOAD_STORAGE_STATUS_SUCCESS,
  payload: estimate,
});

export const getCachedSongs = () => ({type: GET_CACHED_SONGS});

export const getCachedSongsSuccess = (cachedSongs) => ({
  type: GET_CACHED_SONGS_SUCCESS,
  payload: cachedSongs,
});

export const saveMusic = (track, trackIndex) => ({type: SAVE_MUSIC, payload: {track, trackIndex}});

export const saveMusicSuccess = (payload) => ({type: SAVE_MUSIC_SUCCESS, payload});

export const deleteMusic = (payload) => ({type: DELETE_MUSIC, payload});
