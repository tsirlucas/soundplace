import { Observable } from '../../util/RXImports';

import { clearError } from './api.actions';
import {
  NETWORK_ERROR,
  SESSION_ERROR,
  NOT_FOUND_ERROR,
  PRECONDITION_REQUIRED,
  CLEAR_ERROR
} from './api.constants';

const apiEpic = action$ =>
  action$.ofType(
    NETWORK_ERROR,
    SESSION_ERROR,
    NOT_FOUND_ERROR,
    PRECONDITION_REQUIRED
  )
  .delay(3500)
  .mapTo({ type: CLEAR_ERROR });

export default apiEpic;
