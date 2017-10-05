import { h } from 'preact';

import Routes from './routes/Routes';
import { Provider } from 'preact-redux';
import { configureStore } from './store';
import { onResize } from './core/window/window.actions';
import { onOffline, onOnline } from './core/api/api.actions';
import configureDevTools from './util/configureDevTools';

import './util/RXImports';
import './style/index.scss';
import 'immutable-merge-operators';

export const store = configureStore();

store.dispatch(onResize({ target: window }));
window.addEventListener('resize', (e) => store.dispatch(onResize(e)));
window.addEventListener('offline', (e) => store.dispatch(onOffline(e)));
window.addEventListener('online', (e) => store.dispatch(onOnline(e)));

configureDevTools();

const Main = () => (
  <Provider store={store}>
    <Routes/>
  </Provider>
);

export default Main;
