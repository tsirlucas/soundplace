import {createAction} from 'redux-act';

import {User} from 'models';

export const actions = {
  subscribeUser: createAction('user/SUBSCRIBE_USER'),
  setUser: createAction<User>('user/SET_USER'),
};

type ActionsType = typeof actions;
export type Actions = {[P in keyof ActionsType]: ReturnType<ActionsType[P]>};
