import {Epic} from 'redux-observable';

import {RootState} from 'core';

import {ActionsValues} from '../rootActions';
import {actions} from './router.actions';

const reloadRouteEpic: Epic<ActionsValues, RootState> = (action$) => {
  return action$.ofType(actions.reloadRoute.getType()).do(() => window.location.reload());
};

export default reloadRouteEpic;
