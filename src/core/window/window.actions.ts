import {createAction} from 'redux-act';

interface WindowIntel extends Window {
  scrollbarWidth: number;
}

export const actions = {
  onResize: createAction<WindowIntel>('window/ON_RESIZE'),
};

type ActionsType = typeof actions;
export type Actions = {[P in keyof ActionsType]: ReturnType<ActionsType[P]>};
