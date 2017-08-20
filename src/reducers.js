import {combineReducers} from 'redux';

import {RoutesReducer} from './core/router/router.reducer';

const appReducer = combineReducers({
  route: RoutesReducer
});

export default appReducer;
