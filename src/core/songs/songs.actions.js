import {
  REQUEST_SONGS,
  REQUEST_SONGS_SUCCESS,
  UPDATE_SONGS_DATA
} from './songs.constants';

export const getSongs = (entity, id) => ({ type: REQUEST_SONGS, payload: { entity, id } });

export const requestSongsSuccess = (payload) => ({
  type: REQUEST_SONGS_SUCCESS,
  payload
});

export const updateSongsData = (track) => ({ type: UPDATE_SONGS_DATA, payload: { track } });
