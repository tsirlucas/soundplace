import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { bindActionCreators } from 'redux';

import CardList from '../../components/CardList';
import { lazyLoadImages } from '../../util/intersectionObserver';
import { getPlaylists } from '../../core/playlists/playlists.actions';
import { updateSongsData } from '../../core/songs/songs.actions';
import { changeRoute } from '../../core/router/router.actions';

function mapStateToProps({ playlists }) {
  return { playlists };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({ getPlaylists, changeRoute, updateSongsData }, dispatch) };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class PlaylistPage extends Component {

  componentDidMount() {
    this.props.actions.getPlaylists();
  }

  componentDidUpdate() {
    lazyLoadImages();
  }

  onOpen = (track) => {
    this.props.actions.updateSongsData(track);
    this.props.actions.changeRoute(`/playlists/${track.id}`);
  };

  render({ playlists }, state) {
    return <CardList items={playlists} open={this.onOpen}/>;
  }
}
