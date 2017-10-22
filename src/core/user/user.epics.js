import { combineEpics } from 'redux-observable';

import { reloadRoute } from '../router/router.actions';
import { getUserSuccess } from '../user/user.actions';
import { importUserData, getUser } from '../api/api.service';
import { IMPORT_USER_DATA, GET_USER_REQUEST } from './user.constants';

const importUserDataEpic = (action$) => {
  return action$.ofType(IMPORT_USER_DATA)
    .mergeMap(() => importUserData()
      .map(reloadRoute));
};

const getUserEpic = (action$) => {
  return action$.ofType(GET_USER_REQUEST)
    .mergeMap(() => getUser()
      .map(getUserSuccess));
};

export default combineEpics(importUserDataEpic, getUserEpic);
