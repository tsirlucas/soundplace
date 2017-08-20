import createBrowserHistory from 'history/createBrowserHistory';

import * as Routes from './index';

import { store } from '../main.js';

import Page1 from '../pages/Page1';
import Page2 from '../pages/Page2';

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
    Routes.goTo(window.location.pathname);
  }
};

browserHistory.listen(() => {
  const pageElement = document.querySelector('#content');
  if (pageElement) {
    pageElement.scrollIntoView(true);
  }
  updateState();
});

const publicRoutes = {
  childRoutes: [
    {
      path: '/',
      exact: true,
      render: Page1
    }
  ]
};

const privateRoutes = Routes.privatizeRoutes({
  layout: Routes.App,
  childRoutes: [
    {
      path: '/page2',
      render: Page2
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
