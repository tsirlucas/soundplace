import React, {Component} from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import localforage from 'localforage';
import queryString from 'query-string';

import {Icon} from 'src/components';

import {
  mapDispatchToProps,
  MapDispatchToProps,
  mapStateToProps,
  MapStateToProps,
} from './Callback.selectors';

type Props = MapDispatchToProps & MapStateToProps & {from: string} & RouteComponentProps;

class CallbackComponent extends Component<Props> {
  componentWillMount() {
    const {location} = this.props;
    const params = queryString.parse(location.search);
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
        this.props.history.replace('/login');
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
        this.props.history.replace('/playlists');
      } else {
        this.returnToPrevRoute();
      }
      this.props.actions.subscribeCachedSongs();
    }
  }

  returnToPrevRoute() {
    const {history} = this.props;

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
)(withRouter(CallbackComponent));
