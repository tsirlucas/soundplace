import {
  INIT_PLAYER,
  PLAYER_NEXT,
  PLAYER_CLEAR,
  PLAYER_TOGGLE,
  PLAYER_PREVIOUS,
  INIT_PLAYER_SUCCESS,
  INIT_PLAYER_ERROR,
  PLAYER_PLAY_FROM_SONGS
} from './player.constants';

export const initPlayer = () => ({ type: INIT_PLAYER });
export const clear = () => ({ type: PLAYER_CLEAR });
export const toggle = () => ({ type: PLAYER_TOGGLE });
export const next = () => ({ type: PLAYER_NEXT });
export const previous = () => ({ type: PLAYER_PREVIOUS });

export const playFromSongs = (tracklist, trackIndex = 0) => ({
  type: PLAYER_PLAY_FROM_SONGS,
  payload: { tracklist, trackIndex }
});

export const initPlayerSuccess = (playerState) => ({ type: INIT_PLAYER_SUCCESS, payload: playerState });
export const initPlayerError = (playerError) => ({ type: INIT_PLAYER_ERROR });
