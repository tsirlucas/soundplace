import {createAction} from 'redux-act';

import {SocketUpdate, Track} from 'models';

export const actions = {
  subscribeTracks: createAction<string>('tracks/SUBSCRIBE_TRACKS'),
  subscribeToTracksIds: createAction<string[]>('tracks/SUBSCRIBE_TRACKS_IDS'),
  unsubscribeTracks: createAction('tracks/UNSUBSCRIBE_TRACKS'),
  setTracks: createAction<SocketUpdate<Track[]>>('tracks/SET_TRACKS'),
  addTrack: createAction<SocketUpdate<Track>>('tracks/ADD_TRACK'),
  updateTrack: createAction<SocketUpdate<Track>>('tracks/UPDATE_TRACK'),
  removeTrack: createAction<SocketUpdate<Track>>('tracks/REMOVE_TRACK'),
  onOffline: createAction('tracks/ON_OFFLINE'),
};

type ActionsType = typeof actions;
export type Actions = {[P in keyof ActionsType]: ReturnType<ActionsType[P]>};
