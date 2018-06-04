import {Epic} from 'redux-observable';

import {RootState} from 'core';
import {PlaylistRestService} from 'services';

import {ActionsValues} from '../rootActions';
import {actions} from './playlists.actions';

const playlistsEpic: Epic<ActionsValues, RootState> = (action$) =>
  action$.ofType(actions.requestPlaylists.getType()).mergeMap(() =>
    PlaylistRestService.getInstance()
      .get()
      .map(actions.requestPlaylistsSuccess),
  );

export default playlistsEpic;
