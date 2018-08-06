import {createAction} from 'redux-act';

import {SocketUpdate, Track} from 'models';

type CategorizedTracks<T> = SocketUpdate<T> & {
  type: 'playlist' | 'saved';
  keep: string[];
};

export const actions = {
  subscribeToPlaylistTracks: createAction<string>('tracks/SUBSCRIBE_PLAYLIST_TRACKS'),
  unsubscribeFromPlaylistTracks: createAction('tracks/UNSUBSCRIBE_PLAYLIST_TRACKS'),
  subscribeToSavedTracks: createAction<string[]>('tracks/SUBSCRIBE_SAVED_TRACKS'),
  setTracks: createAction<CategorizedTracks<Track[]>>('tracks/SET_TRACKS'),
  addTrack: createAction<CategorizedTracks<Track>>('tracks/ADD_TRACK'),
  updateTrack: createAction<CategorizedTracks<Track>>('tracks/UPDATE_TRACK'),
  removeTrack: createAction<CategorizedTracks<Track>>('tracks/REMOVE_TRACK'),
  onOffline: createAction('tracks/ON_OFFLINE'),
};

type ActionsType = typeof actions;
export type Actions = {[P in keyof ActionsType]: ReturnType<ActionsType[P]>};
