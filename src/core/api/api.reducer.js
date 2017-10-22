import {
  NETWORK_ERROR,
  NOT_FOUND_ERROR,
  CLEAR_ERROR,
  ON_OFFLINE,
  ON_ONLINE
} from './api.constants';

const ApiReducer = (state = {}, action) => {
  switch (action.type) {
    case NETWORK_ERROR:
      return {
        ...state,
        message: 'Houve um problema de conexão. Tente novamente.'
      };
    case NOT_FOUND_ERROR:
      return {
        ...state,
        message: 'Error ao tentar enviar requisição ou não existe. Tente novamente.'
      };
    case CLEAR_ERROR:
      return {
        ...state,
        message: null
      };
    case ON_ONLINE:
      return {
        ...state,
        hasNetwork: true
      };

    case ON_OFFLINE:
      return {
        ...state,
        hasNetwork: false
      };

    default:
      return state;
  }
};

export default ApiReducer;
