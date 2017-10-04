import {
  NETWORK_ERROR,
  NOT_FOUND_ERROR,
  CLEAR_ERROR
} from './api.constants';

const ApiReducer = (state = {}, action) => {
  switch (action.type) {
    case NETWORK_ERROR:
      return { message: 'Houve um problema de conexão. Tente novamente.' };
    case NOT_FOUND_ERROR:
      return { message: 'Error ao tentar enviar requisição ou não existe. Tente novamente.' };
    case CLEAR_ERROR:
      return {};
    default:
      return state;
  }
};

export default ApiReducer;
