import {createAction} from 'redux-act';

import {User} from 'models';

export const actions = {
  subscribeUser: createAction('user/SUBSCRIBE_USER'),
  unsubscribeUser: createAction('user/UNSUBSCRIBE_USER'),
  import: createAction('user/IMPORT'),
  cancelImport: createAction('user/CANCEL_IMPORT'),
  setUser: createAction<User>('user/SET_USER'),
};

type ActionsType = typeof actions;
export type Actions = {[P in keyof ActionsType]: ReturnType<ActionsType[P]>};
