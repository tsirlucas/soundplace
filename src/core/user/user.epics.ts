import {Epic} from 'redux-observable';

import {RootState} from 'core';
import {UserRestService} from 'services';

import {actions, Actions} from './user.actions';

type EpicActions = Actions['requestUser'] | Actions['requestUserSuccess'];

const getUserEpic: Epic<EpicActions, RootState> = (action$) =>
  action$.ofType(actions.requestUser.getType()).mergeMap(() =>
    UserRestService.getInstance()
      .get()
      .map(actions.requestUserSuccess),
  );

export default getUserEpic;
