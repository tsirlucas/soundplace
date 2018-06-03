import {createAction} from 'redux-act';

import {Playlist} from 'models';

export const actions = {
  requestPlaylists: createAction('playlists/REQUEST_PLAYLISTS'),
  requestPlaylistsSuccess: createAction<Playlist[]>('playlists/REQUEST_PLAYLISTS_SUCCESSS'),
};

type ActionsType = typeof actions;
export type Actions = {[P in keyof ActionsType]: ReturnType<ActionsType[P]>};
