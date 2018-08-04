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

const tracksEpic: Epic<ActionsValues, RootState> = (action$) =>
  action$.ofType(actions.subscribeTracks.getType()).mergeMap(({payload}) =>
    TracksClient.getInstance()
      .subscribe(payload as string)
      .map((value) => map[value.operation](value))
      .takeUntil(action$.ofType(actions.unsubscribeTracks.getType())),
  );

const cachedTracksEpic: Epic<ActionsValues, RootState> = (action$) =>
  action$.ofType(actions.subscribeToTracksIds.getType()).mergeMap(({payload}) =>
    TracksClient.getInstance()
      .subscribeByIds(payload as string[])
      .map((value) => map[value.operation](value))
      .takeUntil(action$.ofType(actions.subscribeToTracksIds.getType())),
  );

export default combineEpics(tracksEpic, cachedTracksEpic);
