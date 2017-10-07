import { combineEpics } from 'redux-observable';

import userEpics from './core/user/user.epics';
import routeEpics from './core/router/router.epics';
import playerEpics from './core/player/player.epics';
import artistsEpics from './core/artists/artists.epics';
import playlistsEpics from './core/playlists/playlists.epics';
import serviceWorkerEpics from './core/service-worker/service-worker.epics';

import { Observable } from './util/RXImports';
import { clearError } from './core/api/api.actions';

import { ERRORS_MAP } from './core/api/api.constants';

const handleUncaughtErrors = (error, stream) => {
  if (error.xhr) {
    const errorAction = { type: ERRORS_MAP[error.status], payload: error.xhr.response };

    return Observable.concat(
      Observable.of(error)
        .delay(4000)
        .map(clearError)
        .startWith(errorAction),
      stream);
  }

  //Loging uncaught errors and returning stream (avoids epics to break)
  console.error('Uncaught', error);

  return stream;
};

export const epics = (action$, store) => combineEpics(
  userEpics,
  routeEpics,
  playerEpics,
  playlistsEpics,
  artistsEpics,
  serviceWorkerEpics
)(action$, store)
  .catch(handleUncaughtErrors);
