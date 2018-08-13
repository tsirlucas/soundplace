import {Epic} from 'redux-observable';
import {combineEpics} from 'redux-observable';
import {map, mergeMap, take, takeUntil} from 'rxjs/operators';

import {RootState} from 'core';
import {TracksClient} from 'core/apollo';
import {Track} from 'models';

import {ActionsValues} from '../rootActions';
import {actions, Actions, CategorizedTracks} from './tracks.actions';

const actionsMap = {
  NONE: actions.setTracks as (payload: CategorizedTracks<Track | Track[]>) => void,
  INSERT: actions.addTrack as (payload: CategorizedTracks<Track | Track[]>) => void,
  UPDATE: actions.updateTrack as (payload: CategorizedTracks<Track | Track[]>) => void,
  DELETE: actions.removeTrack as (payload: CategorizedTracks<Track | Track[]>) => void,
};

type SubsActions =
  | Actions['setTracks']
  | Actions['addTrack']
  | Actions['updateTrack']
  | Actions['removeTrack'];
export type EpicActions = SubsActions | Actions['subscribeToPlaylistTracks'];

const playlistTracksEpic: Epic<EpicActions, SubsActions, RootState> = (action$, $state) =>
  action$.ofType(actions.subscribeToPlaylistTracks.getType()).pipe(
    mergeMap(({payload}) =>
      TracksClient.getInstance()
        .subscribe(payload as string)
        .pipe(
          mergeMap((value) =>
            $state.pipe(
              take(1),
              map((state) =>
                actionsMap[value.operation]({
                  ...value,
                  type: 'playlist',
                  keep: Object.keys(state.tracks.saved),
                }),
              ),
            ),
          ),
          takeUntil(action$.ofType(actions.unsubscribeFromPlaylistTracks.getType())),
        ),
    ),
  );

const savedTracksEpic: Epic<ActionsValues, SubsActions, RootState> = (action$, $state) =>
  action$.ofType(actions.subscribeToSavedTracks.getType()).pipe(
    mergeMap(({payload}) =>
      TracksClient.getInstance()
        .subscribeByIds(payload as string[])
        .pipe(
          mergeMap((value) =>
            $state.pipe(
              take(1),
              map((state) =>
                actionsMap[value.operation]({
                  ...value,
                  type: 'playlist',
                  keep: Object.keys(state.tracks.saved),
                }),
              ),
            ),
          ),
          takeUntil(action$.ofType(actions.subscribeToSavedTracks.getType())),
        ),
    ),
  );

export default combineEpics(playlistTracksEpic, savedTracksEpic);
