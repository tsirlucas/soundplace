import { REQUEST_ARTISTS_SUCCESS } from './artists.constants';

const ArtistsReducer = (state = [], action) => {
  switch (action.type) {
    case REQUEST_ARTISTS_SUCCESS:
      return [...action.payload.response.data];
    default:
      return state;
  }
};

export default ArtistsReducer;
