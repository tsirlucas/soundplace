import {REQUEST_PLAYLISTS, REQUEST_PLAYLISTS_SUCCESS} from './playlists.constants';

export const getPlaylists = () => ({type: REQUEST_PLAYLISTS});

export const requestPlaylistsSuccess = (payload) => ({
  type: REQUEST_PLAYLISTS_SUCCESS,
  payload,
});
