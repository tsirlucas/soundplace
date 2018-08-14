import HashRouter from 'react-router-dom/HashRouter';
import Redirect from 'react-router-dom/Redirect';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import {Component, h} from 'preact';
import {connect} from 'preact-redux';

import {AppLayout, PublicLayout} from 'components';
import {Callback} from 'src/views/Callback/Callback';
import {Login} from 'views/Login';
import {Playlist} from 'views/Playlist';
import {Playlists} from 'views/Playlists';
import {Storage} from 'views/Storage';

import {browserHistory} from './routes.config';
import {
  mapDispatchToProps,
  MapDispatchToProps,
  mapStateToProps,
  MapStateToProps,
} from './Routes.selectors';

type Props = MapDispatchToProps & MapStateToProps;

const PrivateRoute = ({component: Component, ...rest}) => (
  <Route
    {...rest}
    render={(props) =>
      rest.token ? <Component {...props} /> : <Redirect from={rest.path} to="/login" />
    }
  />
);

const PublicRoute = ({component: Component, ...rest}) => (
  <Route
    {...rest}
    render={(props) =>
      rest.token ? <Redirect from={rest.path} to="/playlists" /> : <Component {...props} />
    }
  />
);

class RoutesComponent extends Component<Props> {
  unsubscribe: Function;
  state = {lastPath: null as string};

  componentWillMount() {
    this.setState({lastPath: window.location.hash.slice(1)});
    if (browserHistory.location.pathname !== '/callback') {
      browserHistory.replace('/callback');
    }

    browserHistory.listen(() => {
      const pageElement = document.querySelector('#content');

      if (pageElement) {
        document.querySelector('body').scrollTop = 0;
      }
    });
  }

  render() {
    const {token} = this.props;

    return (
      <HashRouter>
        <PublicLayout>
          <Switch>
            <Route path="/callback" render={() => <Callback from={this.state.lastPath} />} />,
            <PublicRoute path="/login" token={token} component={Login} />
            )}
            <PrivateRoute
              path="/"
              token={token}
              component={() => (
                <AppLayout>
                  <Switch>
                    <Route
                      path="/playlists"
                      render={(props) => (
                        <div className="flex-grow-column">
                          <div
                            className="flex-grow-column"
                            style={props.match.path !== props.location.pathname && 'display: none'}
                          >
                            <Playlists />
                          </div>
                          <Route
                            path="/playlists/:playlistId"
                            exact
                            render={(props) => <Playlist {...props} />}
                          />
                        </div>
                      )}
                    />
                    <Route path="/storage" exact component={Storage} />
                    <Redirect to="/playlists" />
                  </Switch>
                </AppLayout>
              )}
            />
          </Switch>
        </PublicLayout>
      </HashRouter>
    );
  }
}

export const Routes = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RoutesComponent);
