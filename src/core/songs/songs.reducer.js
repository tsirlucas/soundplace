import {REQUEST_SONGS_SUCCESS, UPDATE_SONGS_DATA} from './songs.constants';
import {SAVE_MUSIC, SAVE_MUSIC_SUCCESS} from '../storage/storage.constants';

const SongsReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_SONGS_DATA:
      return {
        ...state,
        ...action.payload.track,
        tracks: null,
      };
    case REQUEST_SONGS_SUCCESS:
      return {
        ...state,
        ...action.payload.response.data,
      };
    case SAVE_MUSIC:
      return {
        ...state,
        tracks: state.tracks.map((track, index) => {
          return index === action.payload.trackIndex
            ? {...action.payload.track, downloading: true}
            : track;
        }),
      };
    case SAVE_MUSIC_SUCCESS:
      return {
        ...state,
        tracks: state.tracks.map((track, index) => {
          return index === action.payload.trackIndex ? action.payload.track : track;
        }),
      };
    default:
      return state;
  }
};

export default SongsReducer;
