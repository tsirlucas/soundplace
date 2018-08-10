import Redirect from 'react-router-dom/Redirect';
import Cookie from 'js-cookie';
import {h} from 'preact';

export const isAuthenticated = () => Cookie.get('token');

export const checkAuth = (Route: JSX.Element, isPrivate: boolean, path?: string) => {
  const isAuthenticated = Cookie.get('token');
  const {hash} = window.location;

  if (isAuthenticated) {
    //If route is private and user is not on / already, user proceeds, else route is public, redirect user to private root.
    if (isPrivate) {
      return Route;
    }
    const from = path ? path : hash.slice(1, -1).split('?')[0];
    return from ? <Redirect from={from} to="/playlists" /> : Route;
  }
  const needToRedirect = !hash.includes('/login');
  //If route is private and his not on /login already, user is redirected to app's public root, else user proceeds.
  return isPrivate && needToRedirect ? <Redirect to="/login" /> : Route;
};
