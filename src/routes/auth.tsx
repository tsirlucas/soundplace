import Redirect from 'react-router-dom/Redirect';
import {h} from 'preact';

export const checkAuth = (auth: string, Route: JSX.Element) => {
  const {hash} = window.location;
  const from = hash.slice(1).split('?')[0];
  if (auth) {
    //If route is private and user is not on / already, user proceeds, else route is public, redirect user to private root.
    return Route;
  }

  const needToRedirect = !hash.includes('/callback');
  //If route is private and his not on /login already, user is redirected to app's public root, else user proceeds.
  return needToRedirect ? <Redirect from={from} to="/callback" /> : Route;
};
