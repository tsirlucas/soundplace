import Redirect from 'react-router/Redirect';
import createHashHistory from 'history/createHashHistory';
import {h} from 'preact';

import {actions as routerActions} from 'core/router';
import {store} from 'src/main';
import {Login} from 'views/Login';
import {Playlist} from 'views/Playlist';
import {Playlists} from 'views/Playlists';
import {Storage} from 'views/Storage';

import {privatizeRoutes} from './auth';

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

const publicRoutes = [
  {
    path: '/login',
    component: Login,
  },
];

export const privateRoutes = privatizeRoutes([
  {
    path: '/',
    exact: true,
    component: () => <Redirect to="/playlists" />,
  },
  {
    path: '/playlists',
    icon: 'PLAYLISTS',
    header: 'Playlists',
    exact: true,
    component: Playlists,
  },
  {
    path: '/playlists/:playlistId',
    component: Playlist,
  },
  {
    path: '/storage',
    icon: 'STORAGE',
    header: 'Storage',
    component: Storage,
  },
]);

export const routes = [...publicRoutes, ...privateRoutes];
