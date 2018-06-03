import {createAction} from 'redux-act';

import {User} from 'models';

export const actions = {
  requestUser: createAction('user/REQUEST_USER'),
  requestUserSuccess: createAction<User>('user/requestUserSuccess'),
};

type ActionsType = typeof actions;
export type Actions = {[P in keyof ActionsType]: ReturnType<ActionsType[P]>};
