import { REQUEST_PLAYLISTS_SUCCESS } from './playlists.constants';

const PlaylistsReducer = (state = [], action) => {
  switch (action.type) {
    case REQUEST_PLAYLISTS_SUCCESS:
      return [...state.payload.data];
    default:
      return state;
  }
};

export default PlaylistsReducer;
