import {CHANGE_ROUTE, REPLACE_ROUTE, PREV_ROUTE} from './router.constants';

const initialState = {
  path: '/',
  action: 'replace'
};

export const RoutesReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_ROUTE:
      return state.$merge({
        path: action.payload.path,
        action: 'push'
      });
    case REPLACE_ROUTE:
      return state.$merge({
        path: action.payload.path,
        action: 'replace'
      });
    case PREV_ROUTE:
      return state.$merge({
        path: '*',
        action: 'goBack'
      });
    default:
      return state;
  }
};
