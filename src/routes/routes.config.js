import createBrowserHistory from 'history/createBrowserHistory';

import * as Routes from './index';

import { store } from '../main.js';

import Playlist from '../pages/Playlists';
import Login from '../pages/Login';

export const browserHistory = createBrowserHistory();

export const updateRoute = () => {
  const { browserHistory } = Routes;
  const routeStatus = store.getState().route;
  if (routeStatus.path && window.location.pathname !== routeStatus.path) {
    const action = browserHistory[routeStatus.action];
    action(routeStatus.path);
  }
};

export const updateState = () => {
  const routeStatus = store.getState().route;
  if (window.location.pathname !== routeStatus.path) {
    store.dispatch(Routes.changeRoute(window.location.pathname));
  }
};

browserHistory.listen(() => {
  const pageElement = document.querySelector('#content');
  if (pageElement) {
    document.querySelector('body').scrollTop = 0;
  }
  updateState();
});

const publicRoutes = {
  childRoutes: [
    {
      path: '/login',
      component: Login
    }
  ]
};

export const privateRoutes = Routes.privatizeRoutes({
  layout: Routes.App,
  childRoutes: [
    {
      path: '/',
      exact: true,
      header: 'Home',
      icon: 'HOME',
      component: Playlist
    },
    {
      path: '/playlists',
      icon: 'PLAYLISTS',
      header: 'Playlists',
      component: Playlist
    }
  ]
});

export const routes = {
  layout: Routes.Layout,
  childRoutes: [
    publicRoutes,
    privateRoutes
    // {
    //   path: '*',
    //   component: Routes.ErrorPage
    // }
  ]
};
