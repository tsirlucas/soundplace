import createRavenMiddleware from 'raven-for-redux';
import {applyMiddleware, compose, createStore} from 'redux';
import {createEpicMiddleware} from 'redux-observable';

import {store} from '../main';
import {rootEpic} from './rootEpic';
import {rootReducer, RootState} from './rootReducer';

const isProd = process.env.NODE_ENV === 'production';

let middlewares;
const epicMiddleware = createEpicMiddleware();

if (false) {
  window['Raven'].config('https://e4cb32dd9e394feda33301bd8321f134@sentry.io/208859').install();
  const ravenMiddleware = isProd
    ? createRavenMiddleware(window['Raven'], {
        breadcrumbDataFromAction: (action) => action,
      })
    : undefined;

  middlewares = applyMiddleware(epicMiddleware, ravenMiddleware);
} else {
  middlewares = applyMiddleware(epicMiddleware);
}

const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;

// const composeEnhancers = composeWithDevTools({realtime: false, hostname: '192.168.15.4', port: 8000});

export const configureStore = () => {
  const store = createStore<RootState>(rootReducer, undefined, composeEnhancers(middlewares));
  epicMiddleware.run(rootEpic);
  return store;
};

export const getCurrentState = () => {
  return store.getState();
};
