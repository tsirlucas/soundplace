import axios from 'axios';
import {environment} from 'config';
import Cookie from 'js-cookie';
import {combineEpics, Epic} from 'redux-observable';
import {empty, from, of} from 'rxjs';
import {catchError, map, mergeMap, takeUntil} from 'rxjs/operators';

import {RootState} from 'core';
import {UserClient} from 'core/apollo';

import {actions, Actions} from './user.actions';

export type EpicActions = Actions['subscribeUser'] | Actions['setUser'];

const getUserEpic: Epic<EpicActions, Actions['setUser'], RootState> = (action$) =>
  action$.ofType(actions.subscribeUser.getType()).pipe(
    mergeMap(() =>
      UserClient.getInstance()
        .subscribe()
        .pipe(
          map(actions.setUser),
          takeUntil(action$.ofType(actions.unsubscribeUser.getType())),
        ),
    ),
  );

const mountImportRequest = () => {
  return from(
    axios.get(`${environment.settings.apiUrl}/data/import`, {
      headers: {
        Authorization: Cookie.get('token'),
      },
    }),
  );
};

const importEpic: Epic<EpicActions, Actions['cancelImport'], RootState> = (action$) =>
  action$.ofType(actions.import.getType()).pipe(
    mergeMap(() => mountImportRequest()),
    catchError(() => of(actions.cancelImport())),
    mergeMap(() => empty()),
  );

export default combineEpics(importEpic, getUserEpic);
