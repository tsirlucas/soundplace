import {RELOAD_ROUTE} from './router.constants';
import {importUserDataSuccess} from './router.actions';

const reloadRouteEpic = (action$) => {
  return action$.ofType(RELOAD_ROUTE).map(() => window.location.reload());
};

export default reloadRouteEpic;
