import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { bindActionCreators } from 'redux';
import { saveMusic } from '../../core/storage/storage.actions';

import Playlist from '../../components/Playlist';

function mapStateToProps(state) {
  return { songs: state.player ? state.player.tracklist : [] };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({ saveMusic }, dispatch) };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class PlaylistPage extends Component {
  componentDidMount() {
    // dispatch action
  }

  render({ songs, actions }) {
    return <Playlist playlist={{
      cover: 'https://pl.scdn.co/images/pl/default/1b19606b5ba531a4fc804e09e651b1f8d765ebe7',
      name: 'BEATZ', tracks: songs
    }} onSave={actions.saveMusic} />;
  }
}
