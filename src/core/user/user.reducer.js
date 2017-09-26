import { GET_USER_SUCCESS } from './user.constants';

const UserReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_USER_SUCCESS:
      return { ...action.payload.response };
    default:
      return state;
  }
};

export default UserReducer;
