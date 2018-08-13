import {Epic} from 'redux-observable';
import {tap} from 'rxjs/operators';

import {RootState} from 'core';

import {ActionsValues} from '../rootActions';
import {actions} from './router.actions';

const reloadRouteEpic: Epic<ActionsValues, ActionsValues, RootState> = (action$) => {
  return action$.ofType(actions.reloadRoute.getType()).pipe(tap(() => window.location.reload()));
};

export default reloadRouteEpic;
