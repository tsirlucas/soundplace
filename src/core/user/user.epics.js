import { IMPORT_USER_DATA } from './user.constants';
import { importUserData } from '../api/api.service';
import { reloadRoute } from '../router/router.actions';

const importUserDataEpic = (action$) => {
  return action$.ofType(IMPORT_USER_DATA)
    .mergeMap(() => importUserData()
      .map(reloadRoute));
};

export default importUserDataEpic;
