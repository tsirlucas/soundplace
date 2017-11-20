import {
  PLAYER_NEXT,
  PLAYER_CLEAR,
  PLAYER_TOGGLE,
  PLAYER_DESTROY,
  PLAYER_PREVIOUS,
  INIT_PLAYER_SUCCESS,
  PLAYER_PLAY_FROM_SONGS
} from './player.constants';

const mockedArtwork = [
  { src: 'https://dummyimage.com/96x96', sizes: '96x96', type: 'image/png' },
  { src: 'https://dummyimage.com/128x128', sizes: '128x128', type: 'image/png' },
  { src: 'https://dummyimage.com/192x192', sizes: '192x192', type: 'image/png' },
  { src: 'https://dummyimage.com/256x256', sizes: '256x256', type: 'image/png' },
  { src: 'https://dummyimage.com/384x384', sizes: '384x384', type: 'image/png' },
  { src: 'https://dummyimage.com/512x512', sizes: '512x512', type: 'image/png' }
];

const PlayerReducer = (state = null, action) => {
  switch (action.type) {
    // case INIT_PLAYER_SUCCESS:
    //   return {
    //     ...action.payload,
    //     isPlaying: false,
    //     currentTime: action.payload.lastCurrentTime || null
    //   };
    case PLAYER_CLEAR:
      return {
        ...state,
        hiding: true
      };
    case PLAYER_DESTROY:
      return null;
    case PLAYER_PLAY_FROM_SONGS:
      return {
        ...state,
        isPlaying: true,
        currentTime: null,
        currentIndex: action.payload.trackIndex,
        currentlyPlaying: {
          ...action.payload.tracklist[action.payload.trackIndex],
          artwork: [{ src: action.payload.tracklist[action.payload.trackIndex].album.cover, type: 'image/png' }]
        },
        tracklist: action.payload.tracklist
      };
    case PLAYER_TOGGLE:
      return {
        ...state,
        currentTime: null,
        isPlaying: !state.isPlaying
      };
    case PLAYER_NEXT:
      return {
        ...state,
        isPlaying: true,
        currentTime: null,
        currentIndex: state.currentIndex + 1,
        currentlyPlaying: {
          ...state.tracklist[state.currentIndex + 1],
          artwork: [{ src: state.tracklist[state.currentIndex + 1].album.cover, type: 'image/png' }]
        }
      };
    case PLAYER_PREVIOUS:
      return {
        ...state,
        isPlaying: true,
        currentTime: null,
        currentIndex: state.currentIndex - 1,
        currentlyPlaying: {
          ...state.tracklist[state.currentIndex - 1],
          artwork: [{ src: state.tracklist[state.currentIndex - 1].album.cover, type: 'image/png' }]
        }
      };
    default:
      return state;
  }
};

export default PlayerReducer;
