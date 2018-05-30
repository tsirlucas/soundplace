import {NETWORK_ERROR, NOT_FOUND_ERROR, CLEAR_ERROR, ON_OFFLINE, ON_ONLINE} from './api.constants';

const ApiReducer = (state = {}, action) => {
  switch (action.type) {
    case NETWORK_ERROR:
      return {
        ...state,
        message: 'There was a connection problem. Try again.',
      };
    case NOT_FOUND_ERROR:
      return {
        ...state,
        message: 'Request not found. Try again.',
      };
    case CLEAR_ERROR:
      return {
        ...state,
        message: null,
      };
    case ON_ONLINE:
      return {
        ...state,
        hasNetwork: true,
      };

    case ON_OFFLINE:
      return {
        ...state,
        hasNetwork: false,
      };

    default:
      return state;
  }
};

export default ApiReducer;
