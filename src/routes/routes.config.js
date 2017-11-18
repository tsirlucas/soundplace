import { h } from 'preact';
import createBrowserHistory from 'history/createBrowserHistory';
import Redirect from 'react-router/Redirect';

import * as Routes from './index';

import { store } from '../main.js';

import Login from '../pages/Login';
import Artists from '../pages/Artists';
import Playlists from '../pages/Playlists';
import Playlist from '../pages/Playlist';
import Storage from '../pages/Storage';

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
      component: () => <Redirect to="/home"/>
    },

    {
      path: '/home',
      exact: true,
      header: 'Home',
      icon: 'HOME',
      component: Playlists
    },
    {
      path: '/playlists',
      icon: 'PLAYLISTS',
      header: 'Playlists',
      exact: true,
      component: Playlists
    },
    {
      path: '/playlists/:playlistId',
      component: Playlist
    },
    {
      path: '/artists',
      icon: 'ARTISTS',
      header: 'Artists',
      component: Artists
    },
    {
      path: '/storage',
      icon: 'STORAGE',
      header: 'Storage',
      component: Storage
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
