import {
  REQUEST_ARTISTS,
  REQUEST_ARTISTS_SUCCESS
} from './artists.constants';

export const getArtists = () => ({ type: REQUEST_ARTISTS });

export const requestArtistsSuccess = (payload) => ({
  type: REQUEST_ARTISTS_SUCCESS,
  payload
});
