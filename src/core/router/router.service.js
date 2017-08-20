import {store} from '../../main';
import {changeRoute, replaceRoute, prevRoute} from './router.actions';

const dispatchGoBack = () => store.dispatch(prevRoute());
const dispatchChangeRoute = (path) => store.dispatch(changeRoute(path));
const dispatchReplaceRoute = (path) => store.dispatch(replaceRoute(path));

export const goBack = () => dispatchGoBack();
export const goTo = (path) => dispatchChangeRoute(path);
export const replaceFor = (path) => dispatchReplaceRoute(path);

export default {goTo, replaceFor, goBack};
