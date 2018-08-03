import createHashHistory from 'history/createHashHistory';

import {actions as routerActions} from 'core/router';
import {store} from 'src/main';

export const browserHistory = createHashHistory();

export const updateRoute = () => {
  const routeStatus = store.getState().router;
  if (routeStatus.path && window.location.pathname !== routeStatus.path) {
    const action = browserHistory[routeStatus.action];
    action(routeStatus.path);
  }
};

export const updateState = () => {
  const routeStatus = store.getState().router;
  if (window.location.pathname !== routeStatus.path) {
    store.dispatch(routerActions.changeRoute(window.location.pathname));
  }
};

export const privateRoutes = [
  {
    path: '/playlists',
    icon: 'PLAYLISTS',
    header: 'Playlists',
  },
  {
    path: '/storage',
    icon: 'STORAGE',
    header: 'Storage',
  },
];
