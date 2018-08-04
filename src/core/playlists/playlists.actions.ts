import {createAction} from 'redux-act';

import {Playlist, SocketUpdate} from 'models';

export const actions = {
  subscribePlaylists: createAction('playlists/SUBSCRIBE_PLAYLISTS'),
  setPlaylists: createAction<SocketUpdate<Playlist[]>>('playlists/SET_PLAYLISTS'),
  addPlaylist: createAction<SocketUpdate<Playlist>>('playlists/ADD_PLAYLIST'),
  updatePlaylist: createAction<SocketUpdate<Playlist>>('playlists/UPDATE_PLAYLIST'),
  removePlaylist: createAction<SocketUpdate<Playlist>>('playlists/REMOVE_PLAYLIST'),
};

type ActionsType = typeof actions;
export type Actions = {[P in keyof ActionsType]: ReturnType<ActionsType[P]>};
