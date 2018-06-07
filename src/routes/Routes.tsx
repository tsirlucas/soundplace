import HashRouter from 'react-router-dom/HashRouter';
import Redirect from 'react-router-dom/Redirect';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import {Component, h} from 'preact';

import {AppLayout, PublicLayout} from 'components';
import {Login} from 'views/Login';

import {checkAuth} from './auth';
import handleDirectAccess from './handleDirectAccess';
import {browserHistory, privateRoutes, updateRoute, updateState} from './routes.config';

export class Routes extends Component<null, null> {
  unsubscribe: Function;

  shouldComponentUpdate() {
    return false;
  }

  componentWillMount() {
    let {store} = this.context;

    browserHistory.listen(() => {
      const pageElement = document.querySelector('#content');
      if (pageElement) {
        document.querySelector('body').scrollTop = 0;
      }
      updateState();
    });

    handleDirectAccess();
    this.unsubscribe = store.subscribe(updateRoute);
  }

  componentDidUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <HashRouter>
        <PublicLayout>
          <Switch>
            {checkAuth(<Route path="/login" component={Login} />, false, '/login')}
            <AppLayout>
              {privateRoutes.map((route, i) =>
                checkAuth(<Route key={i} {...route} />, route.isPrivate, route.path),
              )}
            </AppLayout>
            {checkAuth(<Redirect to="/playlists" />, false, '/playlists')}
          </Switch>
        </PublicLayout>
      </HashRouter>
    );
  }
}
