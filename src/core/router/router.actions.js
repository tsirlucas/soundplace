import {CHANGE_ROUTE, REPLACE_ROUTE, PREV_ROUTE} from './router.constants';

export const changeRoute = (path) => ({
	type: CHANGE_ROUTE,
	payload: {path}
});

export const replaceRoute = (path) => ({
	type: REPLACE_ROUTE,
	payload: {path}
});

export const prevRoute = (path) => ({
	type: PREV_ROUTE,
	payload: {path}
});

export default {changeRoute, replaceRoute, prevRoute};
