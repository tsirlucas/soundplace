import throttle from 'lodash.throttle';
import { createEpicMiddleware } from 'redux-observable';
import { createStore, applyMiddleware, compose } from 'redux';
// import {composeWithDevTools} from 'remote-redux-devtools';

import { store } from './main';
import { epics } from './epics';
import reducers from './rootReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const composeEnhancers = composeWithDevTools({realtime: false, hostname: '192.168.15.4', port: 8000});

export const configureStore = () => {
  const store = createStore(reducers, {}, composeEnhancers(applyMiddleware(createEpicMiddleware(epics))));
  return store;
};

export const getCurrentState = () => {
  return store.getState();
};
