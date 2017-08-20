import { h } from 'preact';

import Redirect from 'react-router/Redirect';

export const checkAuth = (Route, isPrivate) => {
  const isAuthenticated = false;

  if (isAuthenticated) {
    //If route is private, user proceeds, else route is public, redirect user to private root.
    return isPrivate
      ? Route
      : <Redirect to='/page2'/>;
  }
  //If route is private, user is redirected to app's public root, else user proceeds.
  return isPrivate
    ? <Redirect to='/'/>
    : Route;
};

export const privatizeRoutes = (routes) => {
  if (routes.childRoutes) {
    privatizeRoutes(routes.childRoutes);
  }

  if (routes.length) {
    return routes.map(route => {
      route.isPrivate = true;
      return route;
    });
  }

  routes.isPrivate = true;
  return routes;
};
