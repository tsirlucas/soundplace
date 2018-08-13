import {Epic} from 'redux-observable';
import {map, mergeMap} from 'rxjs/operators';

import {RootState} from 'core';
import {PlaylistsClient} from 'core/apollo';

import {actions, Actions} from './playlists.actions';

const actionsMap = {
  NONE: actions.setPlaylists,
  INSERT: actions.addPlaylist,
  UPDATE: actions.updatePlaylist,
  DELETE: actions.removePlaylist,
};

type SubsActions =
  | Actions['setPlaylists']
  | Actions['addPlaylist']
  | Actions['updatePlaylist']
  | Actions['removePlaylist'];
export type EpicActions = SubsActions | Actions['subscribePlaylists'];

const playlistsEpic: Epic<EpicActions, SubsActions, RootState> = (action$) =>
  action$.ofType(actions.subscribePlaylists.getType()).pipe(
    mergeMap(() =>
      PlaylistsClient.getInstance()
        .subscribe()
        .pipe(map((value) => actionsMap[value.operation](value))),
    ),
  );

export default playlistsEpic;
