import {Epic} from 'redux-observable';

import {RootState} from 'core';
import {UserClient} from 'core/apollo';

import {actions, Actions} from './user.actions';

type EpicActions = Actions['subscribeUser'] | Actions['setUser'];

const getUserEpic: Epic<EpicActions, RootState> = (action$) =>
  action$.ofType(actions.subscribeUser.getType()).mergeMap(() =>
    UserClient.getInstance()
      .subscribe()
      .map(actions.setUser),
  );

export default getUserEpic;
