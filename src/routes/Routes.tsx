import HashRouter from 'react-router-dom/HashRouter';
import Redirect from 'react-router-dom/Redirect';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import {Component, h} from 'preact';

import {AppLayout, PublicLayout} from 'components';
import {Login} from 'views/Login';
import {Playlist} from 'views/Playlist';
import {Playlists} from 'views/Playlists';
import {Storage} from 'views/Storage';

import {checkAuth} from './auth';
import handleDirectAccess from './handleDirectAccess';
import {browserHistory, updateRoute, updateState} from './routes.config';

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
            {checkAuth(<Route path="/login" component={Login} />, false)}
            {checkAuth(
              <AppLayout>
                <Switch>
                  <Route path="/" exact={true} component={() => <Redirect to="/playlists" />} />
                  <Route
                    path="/playlists"
                    render={(props) => (
                      <div>
                        <div
                          style={props.match.path !== props.location.pathname && 'display: none'}
                        >
                          <Playlists />
                        </div>
                        <Route
                          path="/playlists/:playlistId"
                          exact
                          component={(props) => <Playlist {...props} />}
                        />
                      </div>
                    )}
                  />
                  <Route path="/storage" exact component={Storage} />
                  <Redirect to="/playlists" />
                </Switch>
              </AppLayout>,
              true,
            )}
          </Switch>
        </PublicLayout>
      </HashRouter>
    );
  }
}
