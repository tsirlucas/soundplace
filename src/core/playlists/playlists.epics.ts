import {Epic} from 'redux-observable';

import {RootState} from 'core';
import {PlaylistsClient} from 'core/apollo';

import {ActionsValues} from '../rootActions';
import {actions} from './playlists.actions';

const map = {
  NONE: actions.setPlaylists,
  INSERT: actions.addPlaylist,
  UPDATE: actions.updatePlaylist,
  DELETE: actions.removePlaylist,
};

const playlistsEpic: Epic<ActionsValues, RootState> = (action$) =>
  action$.ofType(actions.subscribePlaylists.getType()).mergeMap(() =>
    PlaylistsClient.getInstance()
      .subscribe()
      .map((value) => map[value.operation](value)),
  );

export default playlistsEpic;
