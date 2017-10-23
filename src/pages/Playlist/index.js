import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { bindActionCreators } from 'redux';

import Playlist from '../../components/Playlist';

let playlistMock = {
  cover: 'https://pl.scdn.co/images/pl/default/1b19606b5ba531a4fc804e09e651b1f8d765ebe7',
  name: 'BEATZ',
  tracks: [
    {
      name: 'Bitch dont kill my vibe',
      artist: 'Kendrick Lamar',
      album: 'DAMN.',
      duration: '4:32'
    },
    {
      name: 'Bitch dont kill my vibe',
      artist: 'Kendrick Lamar',
      album: 'DAMN.',
      duration: '4:32'
    },
    {
      name: 'Bitch dont kill my vibe',
      artist: 'Kendrick Lamar',
      album: 'DAMN.',
      duration: '4:32'
    },
    {
      name: 'Bitch dont kill my vibe',
      artist: 'Kendrick Lamar',
      album: 'DAMN.',
      duration: '4:32'
    }
  ]
};

export default class PlaylistPage extends Component {
  componentDidMount() {
    // dispatch action
  }

  render() {
    return <Playlist playlist={playlistMock} />;
  }
}
