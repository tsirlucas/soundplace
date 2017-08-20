import throttle from 'lodash.throttle';
import {createEpicMiddleware} from 'redux-observable';
import {createStore, applyMiddleware, compose} from 'redux';
// import {composeWithDevTools} from 'remote-redux-devtools';

import {store} from './main';
import {epics} from './epics';
import reducers from './rootReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const composeEnhancers = composeWithDevTools({realtime: false, hostname: '192.168.15.4', port: 8000});

const loadBackup = (backupId) => JSON.parse(window.localStorage[backupId] || '{}');

const backup = (backupId, backupData) => window.localStorage[backupId] = JSON.stringify(backupData);

export const configureStore = () => {
  const persistedState = loadBackup('MY_APP');
  const store = createStore(reducers, persistedState, composeEnhancers(applyMiddleware(createEpicMiddleware(epics))));
  store.subscribe(throttle(() => backup('MY_APP', store.getState()), 1000));
  return store;
};

export const getCurrentState = () => {
  return store.getState();
};
