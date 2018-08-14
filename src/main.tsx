import {h} from 'preact';
import {Provider} from 'preact-redux';

import {actions as apiActions} from 'core/api';
import {configureStore} from 'core/store';
import {actions as windowActions} from 'core/window';

import {Routes} from './routes/Routes';
import './style/index.scss';
import configureDevTools from './util/configureDevTools';

export const store = configureStore();

const getWindowIntel = () => {
  const scrEl = document.querySelector('#content') as HTMLElement;
  const scrollbarWidth = scrEl ? scrEl.offsetWidth - scrEl.clientWidth : 0;
  return {...window, scrollbarWidth};
};

store.dispatch(windowActions.onResize(getWindowIntel()));

if (!window.navigator.onLine) {
  store.dispatch(apiActions.onOffline());
}

window.addEventListener('resize', () => store.dispatch(windowActions.onResize(getWindowIntel())));
window.addEventListener('offline', () => store.dispatch(apiActions.onOffline()));
window.addEventListener('online', () => store.dispatch(apiActions.onOnline()));

configureDevTools();

const Main = () => (
  <Provider store={store}>
    <Routes />
  </Provider>
);

export default Main;
