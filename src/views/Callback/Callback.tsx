import localforage from 'localforage';
import {Component, h} from 'preact';
import {connect} from 'preact-redux';
import queryString from 'query-string';

import {Icon} from 'src/components';

import {
  mapDispatchToProps,
  MapDispatchToProps,
  mapStateToProps,
  MapStateToProps,
} from './Callback.selectors';

type Props = MapDispatchToProps & MapStateToProps & {from: string};

class CallbackComponent extends Component<Props> {
  componentWillMount() {
    const {route} = this.context.router;
    const params = queryString.parse(route.location.search);
    if (!!params['token']) {
      this.handleAuthCallback(params['token']);
    } else {
      this.checkStoragedToken();
    }
  }

  checkStoragedToken() {
    localforage.getItem('token').then((token: string) => {
      if (token) {
        this.props.actions.setToken(token);
      } else {
        this.context.router.history.replace('/login');
      }
    });
  }

  handleAuthCallback(token) {
    localforage.setItem('token', token).then(() => {
      this.props.actions.setToken(token);
    });
  }

  componentWillReceiveProps({token}: Props) {
    if (token && token !== this.props.token) {
      if (this.props.from.includes('callback') || this.props.from.includes('login')) {
        this.context.router.history.replace('/playlists');
      } else {
        this.returnToPrevRoute();
      }
      this.props.actions.subscribeCachedSongs();
    }
  }

  returnToPrevRoute() {
    const {history} = this.context.router;

    const hash = this.props.from;

    const splitedPath = hash
      .slice(1)
      .split('/')
      .filter((val) => val);

    history.replace('/');

    if (!splitedPath.length) history.push('playlists');

    splitedPath.reduce((currPath, nextPath) => {
      history.push(currPath + nextPath);
      return currPath.concat(nextPath + '/');
    }, '/');
  }

  render() {
    return (
      <div className="callback-container">
        <span className="icon-spinner">
          <Icon icon="SYNC" size="96" />
        </span>
      </div>
    );
  }
}

export const Callback = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CallbackComponent);
