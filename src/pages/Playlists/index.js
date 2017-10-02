import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { bindActionCreators } from 'redux';

import CardList from '../../components/CardList';
import { lazyLoadImages } from '../../util/intersectionObserver';
import { getPlaylists } from '../../core/playlists/playlists.actions';

function mapStateToProps({ playlists }) {
  return { playlists };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({ getPlaylists }, dispatch) };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class PlaylistPage extends Component {

  componentDidMount() {
    this.props.actions.getPlaylists();
  }

  componentDidUpdate() {
    lazyLoadImages();
  }

  render({ playlists }, state) {
    return <CardList items={playlists} />;
  }
}
