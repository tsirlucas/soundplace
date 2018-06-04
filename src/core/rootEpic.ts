import {combineEpics} from 'redux-observable';
import {Observable} from 'rxjs';

import {actions} from 'core/api/api.actions';
import {ERRORS_MAP} from 'core/api/api.constants';
import playerEpics from 'core/player/player.epics';
import playlistsEpics from 'core/playlists/playlists.epics';
import routeEpics from 'core/router/router.epics';
import storageEpics from 'core/storage/storage.epics';
import tracksEpics from 'core/tracks/tracks.epics';
import userEpics from 'core/user/user.epics';

const combinedEpics = combineEpics(
  userEpics,
  routeEpics,
  playerEpics,
  playlistsEpics,
  storageEpics,
  tracksEpics,
);

export type RootEpic = typeof combinedEpics;

const handleUncaughtErrors = (error, stream) => {
  if (error.xhr) {
    const errorActionCreator = ERRORS_MAP[error.status];

    return Observable.concat(
      Observable.of(error)
        .delay(4000)
        .map(actions.clearError)
        .startWith(errorActionCreator(error.xhr.response)),
      stream,
    );
  }

  //Loging uncaught errors and returning stream (avoids epics to break)
  console.error('Uncaught', error);

  return stream;
};

export const rootEpic = (action$, store) => {
  return combinedEpics(action$, store, undefined).catch(handleUncaughtErrors);
};
