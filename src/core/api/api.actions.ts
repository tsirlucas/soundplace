import {createAction} from 'redux-act';

export const actions = {
  clearError: createAction('api/CLEAR_ERROR'),
  onOnline: createAction('api/ON_ONLINE'),
  onOffline: createAction('api/ON_OFFLINE'),
  notFoundError: createAction('api/NOT_FOUND_ERROR'),
  networkError: createAction('api/NETWORK_ERROR'),
  sessionError: createAction('api/SESSION_ERROR'),
  preconditionRequired: createAction('api/PRECONDITION_REQUIRED'),
};

type ActionsType = typeof actions;
export type Actions = {[P in keyof ActionsType]: ReturnType<ActionsType[P]>};
