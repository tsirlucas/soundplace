import { IMPORT_USER_DATA, GET_USER_REQUEST, GET_USER_SUCCESS } from './user.constants';

export const getUser = () => ({
  type: GET_USER_REQUEST,
  payload: {}
});

export const getUserSuccess = (result) => ({
  type: GET_USER_SUCCESS,
  payload: result
});

export const importUserData = () => ({
  type: IMPORT_USER_DATA,
  payload: {}
});

export default { importUserData };
