import Redirect from 'react-router/Redirect';
import Cookie from 'js-cookie';
import {h} from 'preact';

export const isAuthenticated = () => Cookie.get('token');

export const checkAuth = (Route, isPrivate, path) => {
  const isAuthenticated = Cookie.get('token');
  const {pathname} = window.location;

  if (isAuthenticated) {
    //If route is private and user is not on / already, user proceeds, else route is public, redirect user to private root.
    if (isPrivate) {
      return Route;
    }
    return <Redirect from={path} to="/playlists" />;
  }

  const needToRedirect = !pathname.includes('/login');
  //If route is private and his not on /login already, user is redirected to app's public root, else user proceeds.
  return isPrivate && needToRedirect ? <Redirect to="/login" /> : Route;
};

export const privatizeRoutes = (routes) => {
  if (routes.childRoutes) {
    privatizeRoutes(routes.childRoutes);
  }

  if (routes.length) {
    return routes.map((route) => {
      route.isPrivate = true;
      return route;
    });
  }

  routes.isPrivate = true;
  return routes;
};
