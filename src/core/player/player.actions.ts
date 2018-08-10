import {createAction} from 'redux-act';

import {IndexedTracks} from 'models';

import {PlayerState} from './player.reducer';

export const actions = {
  initPlayer: createAction('player/INIT_PLAYER'),

  toggle: createAction('player/PLAYER_TOGGLE'),
  playMusic: createAction<string>('player/CHANGE_MUSIC'),
  setList: createAction<IndexedTracks>('player/SET_LIST'),
  updateTime: createAction<{currentTime: number; duration: number}>('player/UPDATE_TIME'),

  initPlayerSuccess: createAction<PlayerState>('player/INIT_PLAYER_SUCCESS'),
  initPlayerError: createAction('player/INIT_PLAYER_ERROR'),
};

type ActionsType = typeof actions;
export type Actions = {[P in keyof ActionsType]: ReturnType<ActionsType[P]>};
