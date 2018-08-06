import {Epic} from 'redux-observable';
import {combineEpics} from 'redux-observable';

import {RootState} from 'core';
import {TracksClient} from 'core/apollo';

import {ActionsValues} from '../rootActions';
import {actions} from './tracks.actions';

const map = {
  NONE: actions.setTracks,
  INSERT: actions.addTrack,
  UPDATE: actions.updateTrack,
  DELETE: actions.removeTrack,
};


const playlistTracksEpic: Epic<ActionsValues, RootState> = (action$, store) =>
  action$.ofType(actions.subscribeToPlaylistTracks.getType()).mergeMap(({payload}) =>
    TracksClient.getInstance()
      .subscribe(payload as string)
      .map((value) => map[value.operation]({...value, type: 'playlist', keep: Object.keys(store.getState().tracks.saved)}))
      .takeUntil(action$.ofType(actions.unsubscribeFromPlaylistTracks.getType())),
  );

const savedTracksEpic: Epic<ActionsValues, RootState> = (action$, store) =>
  action$.ofType(actions.subscribeToSavedTracks.getType()).mergeMap(({payload}) =>
    TracksClient.getInstance()
      .subscribeByIds(payload as string[])
      .map((value) => map[value.operation]({...value, type: 'saved', keep: Object.keys(store.getState().tracks.playlist)}))
      .takeUntil(action$.ofType(actions.subscribeToSavedTracks.getType())),
  );

export default combineEpics(playlistTracksEpic, savedTracksEpic);
