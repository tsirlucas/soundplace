import axios from 'axios';
import {environment} from 'config';
import Cookie from 'js-cookie';
import {combineEpics, Epic} from 'redux-observable';
import {Observable} from 'rxjs';

import {RootState} from 'core';
import {UserClient} from 'core/apollo';

import {actions, Actions} from './user.actions';

type EpicActions = Actions['subscribeUser'] | Actions['setUser'];

const getUserEpic: Epic<EpicActions, RootState> = (action$) =>
  action$.ofType(actions.subscribeUser.getType()).mergeMap(() =>
    UserClient.getInstance()
      .subscribe()
      .map(actions.setUser)
      .takeUntil(action$.ofType(actions.unsubscribeUser.getType())),
  );

const mountImportRequest = () => {
  return Observable.fromPromise(
    axios.get(`${environment.settings.apiUrl}/data/import`, {
      headers: {
        Authorization: Cookie.get('token'),
      },
    }),
  );
};

const importEpic: Epic<EpicActions, RootState> = (action$) =>
  action$
    .ofType(actions.import.getType())
    .mergeMap(() =>
      mountImportRequest().catch(() => {
        return Observable.of(actions.cancelImport());
      }),
    )
    .mergeMap(() => Observable.empty<never>());

export default combineEpics(importEpic, getUserEpic);
