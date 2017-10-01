import { h } from 'preact';

import Routes from './routes/Routes';
import { Provider } from 'preact-redux';
import { configureStore } from './store';
import { watchResize, onResize } from './core/window/window.actions';
import configureDevTools from './util/configureDevTools';

import './util/RXImports';
import './style/index.scss';
import 'immutable-merge-operators';

export const store = configureStore();

store.dispatch(onResize({ target: window }));
store.dispatch(watchResize());

configureDevTools();

const Main = () => (
  <Provider store={store}>
    <Routes/>
  </Provider>
);

export default Main;
