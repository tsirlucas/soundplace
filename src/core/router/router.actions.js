import { CHANGE_ROUTE, REPLACE_ROUTE, PREV_ROUTE, RELOAD_ROUTE } from './router.constants';

export const changeRoute = (path) => ({
  type: CHANGE_ROUTE,
  payload: { path }
});

export const replaceRoute = (path) => ({
  type: REPLACE_ROUTE,
  payload: { path }
});

export const prevRoute = (path) => ({
  type: PREV_ROUTE,
  payload: { path }
});

export const reloadRoute = () => ({
  type: RELOAD_ROUTE,
  payload: {}
});

export default { changeRoute, replaceRoute, prevRoute, reloadRoute };
