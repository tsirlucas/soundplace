import {Component, h} from 'preact';
import {connect} from 'preact-redux';

import CardList from '../../components/CardList';
import {lazyLoadImages} from '../../util/intersectionObserver';
import {
  mapDispatchToProps,
  MapDispatchToProps,
  mapStateToProps,
  MapStateToProps,
} from './Playlists.selectors';

type Props = MapStateToProps & MapDispatchToProps;

class PlaylistsComponent extends Component<Props, {}> {
  componentDidMount() {
    this.props.actions.subscribePlaylists();
  }

  componentDidUpdate() {
    lazyLoadImages();
  }

  onOpen = (track) => {
    this.props.actions.changeRoute(`/playlists/${track.id}`);
  };

  render({playlists}: Props) {
    return <CardList items={playlists} open={this.onOpen} />;
  }
}

export const Playlists = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlaylistsComponent);
