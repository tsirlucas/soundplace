import {Observable} from 'rxjs/Observable';

import {SESSION_ERROR} from './api.constants';
import {changeRoute} from '../router/router.actions';

const apiEpic = (action$) =>
  action$.ofType(SESSION_ERROR)
    .mergeMap(() =>
      Observable.of()
        .finally(() => changeRoute('MY_APP_HERE')));

export default apiEpic;
