import {Observable} from 'rxjs/Observable';

import {SESSION_ERROR} from './api.constants';
import {goTo} from '../router/router.service';

const apiEpic = (action$) =>
  action$.ofType(SESSION_ERROR)
    .mergeMap(() =>
      Observable.of()
        .finally(() => goTo('MY_APP_HERE')));

export default apiEpic;
