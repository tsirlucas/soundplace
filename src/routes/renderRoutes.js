import { h } from 'preact';
import Route from 'react-router/Route';

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
    checkAuth(<Route key={i} {...route}>{checkLayout(route)}</Route>, route.isPrivate)
  ));

const renderRoutes = (routes) => {
  const Layout = routes.layout;

  return routes ? (
    <Layout>
      {renderChild(routes.childRoutes)}
    </Layout>
  ) : null;
};

export default renderRoutes;
