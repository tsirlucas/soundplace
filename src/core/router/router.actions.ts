import {createAction} from 'redux-act';

export const actions = {
  changeRoute: createAction<string>('router/CHANGE_ROUTE'),
  replaceRoute: createAction<string>('router/REPLACE_ROUTE'),
  prevRoute: createAction<string>('router/PREV_ROUTE'),
  reloadRoute: createAction('router/RELOAD_ROUTE'),
};

type ActionsType = typeof actions;
export type Actions = {[P in keyof ActionsType]: ReturnType<ActionsType[P]>};
