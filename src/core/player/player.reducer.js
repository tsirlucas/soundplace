import {
  PLAYER_NEXT,
  PLAYER_CLEAR,
  PLAYER_TOGGLE,
  PLAYER_DESTROY,
  PLAYER_PREVIOUS,
  INIT_PLAYER_SUCCESS,
  PLAYER_PLAY_FROM_PLAYLIST
} from './player.constants';

const PlayerReducer = (state = null, action) => {
  switch (action.type) {
    case INIT_PLAYER_SUCCESS:
      return {
        ...action.payload,
        isPlaying: false
      };
    case PLAYER_CLEAR:
      return {
        ...state,
        hiding: true
      };
    case PLAYER_DESTROY:
      return null;
    case PLAYER_PLAY_FROM_PLAYLIST:
      return {
        ...state,
        isPlaying: true,
        currentIndex: action.payload.trackIndex,
        currentlyPlaying: action.payload.tracklist[action.payload.trackIndex],
        tracklist: action.payload.tracklist
      };
    case PLAYER_TOGGLE:
      return {
        ...state,
        isPlaying: !state.isPlaying
      };
    case PLAYER_NEXT:
      return {
        ...state,
        currentIndex: state.currentIndex + 1,
        currentlyPlaying: state.tracklist[state.currentIndex + 1]
      };
    case PLAYER_PREVIOUS:
      return {
        ...state,
        currentIndex: state.currentIndex - 1,
        currentlyPlaying: state.tracklist[state.currentIndex - 1]
      };
    default:
      return state;
  }
};

export default PlayerReducer;
