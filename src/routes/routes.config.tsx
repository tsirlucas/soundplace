import Redirect from 'react-router/Redirect';
import createBrowserHistory from 'history/createBrowserHistory';
import {h} from 'preact';

import {AppLayout, PublicLayout} from 'components';
import {actions as routerActions} from 'core/router';
import {store} from 'src/main';
import {Login} from 'views/Login';
import {Playlist} from 'views/Playlist';
import {Playlists} from 'views/Playlists';
import {Storage} from 'views/Storage';

import {privatizeRoutes} from './auth';

export const browserHistory = createBrowserHistory();

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
      component: Login,
    },
  ],
};

export const privateRoutes = privatizeRoutes({
  layout: AppLayout,
  childRoutes: [
    {
      path: '/',
      exact: true,
      component: () => <Redirect to="/playlists" />,
    },

    // {
    //   path: '/home',
    //   exact: true,
    //   header: 'Home',
    //   icon: 'HOME',
    //   component: Playlists
    // },
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
    // {
    //   path: '/artists',
    //   icon: 'ARTISTS',
    //   header: 'Artists',
    //   component: Artists
    // },
    {
      path: '/storage',
      icon: 'STORAGE',
      header: 'Storage',
      component: Storage,
    },
  ],
});

export const routes = {
  layout: PublicLayout,
  childRoutes: [
    publicRoutes,
    privateRoutes,
    // {
    //   path: '*',
    //   component: Routes.ErrorPage
    // }
  ],
};
