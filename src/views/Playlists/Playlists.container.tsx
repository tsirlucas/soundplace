import React, {Component} from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import CardList from '../../components/CardList';
import {lazyLoadImages} from '../../util/intersectionObserver';
import {
  mapDispatchToProps,
  MapDispatchToProps,
  mapStateToProps,
  MapStateToProps,
} from './Playlists.selectors';

type Props = MapStateToProps & MapDispatchToProps & RouteComponentProps;

class PlaylistsComponent extends Component<Props, {}> {
  componentDidMount() {
    this.props.actions.subscribePlaylists();
  }

  componentDidUpdate() {
    lazyLoadImages();
  }

  onOpen = (track) => {
    this.props.history.push(`/playlists/${track.id}`);
  };

  render() {
    return <CardList items={this.props.playlists} open={this.onOpen} />;
  }
}

export const Playlists = connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(PlaylistsComponent));
