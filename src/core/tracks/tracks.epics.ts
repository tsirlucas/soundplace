import {Epic} from 'redux-observable';

import {RootState} from 'core';
import {PlaylistRestService} from 'services';

import {actions, Actions} from './tracks.actions';

type EpicActions = Actions['requestTracks'] | Actions['requestTracksSuccess'];

const tracksEpic: Epic<EpicActions, RootState> = (action$) =>
  action$.ofType(actions.requestTracks.getType()).mergeMap((action: Actions['requestTracks']) =>
    PlaylistRestService.getInstance()
      .getTracks(action.payload)
      .map(actions.requestTracksSuccess),
  );

export default tracksEpic;
