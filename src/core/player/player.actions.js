import {
  INIT_PLAYER,
  PLAYER_NEXT,
  PLAYER_CLEAR,
  PLAYER_TOGGLE,
  PLAYER_PREVIOUS,
  INIT_PLAYER_SUCCESS,
  PLAYER_PLAY_FROM_PLAYLIST
} from './player.constants';

export const initPlayer = () => ({ type: INIT_PLAYER });
export const clear = () => ({ type: PLAYER_CLEAR });
export const toggle = () => ({ type: PLAYER_TOGGLE });
export const next = () => ({ type: PLAYER_NEXT });
export const previous = () => ({ type: PLAYER_PREVIOUS });

export const playFromPlaylist = (tracklist, trackIndex = 0) => ({
  type: PLAYER_PLAY_FROM_PLAYLIST,
  payload: { tracklist, trackIndex }
});

export const initPlayerSuccess = (playerState) => ({ type: INIT_PLAYER_SUCCESS, payload: playerState });
