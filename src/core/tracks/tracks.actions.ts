import {createAction} from 'redux-act';

import {TrackList} from 'models';

export const actions = {
  requestTracks: createAction<string>('tracks/REQHEST_TRACKS'),
  requestTracksSuccess: createAction<TrackList>('tracks/REQUEST_TRACKS_SUCCESS'),
  updateTracksData: createAction<TrackList>('tracks/UPDATE_TRACKS_DATA'),
  onOffline: createAction('tracks/ON_OFFLINE'),
};

type ActionsType = typeof actions;
export type Actions = {[P in keyof ActionsType]: ReturnType<ActionsType[P]>};
