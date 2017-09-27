import { h } from 'preact';
import Route from 'react-router/Route';
import Switch from 'react-router/Switch';

import { checkAuth } from './auth';

const render = (route) => route.childRoutes ? renderChild(route.childRoutes) : null;

const checkLayout = (route) => {
  const Layout = route.layout;

  return Layout ? (
    <Layout>
      {render(route)}
    </Layout>
  ) : render(route);
};

const renderChild = (routes) => (
  routes.map((route, i) =>
    checkAuth(<Route key={i} {...route}>{checkLayout(route)}</Route>, route.isPrivate, route.path)
  ));

const renderRoutes = (routes) => {
  const Layout = routes.layout;

  return routes ? (
    <Layout>
      <Switch>
        {routes.childRoutes.map((route, i) =>
          checkLayout(route)
        )}
      </Switch>
    </Layout>
  ) : null;
};

export default renderRoutes;
