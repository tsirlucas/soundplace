import { IMPORT_USER_DATA } from './user.constants';

export const importUserData = () => ({
  type: IMPORT_USER_DATA,
  payload: {}
});

export default { importUserData };
