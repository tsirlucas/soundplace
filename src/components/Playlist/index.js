import { h, Component } from 'preact';

import Track from './components/Track';

export default class Playlist extends Component {

  render({ playlist }, state) {
    return (
      <div>
        <span>{playlist.playlistName}</span>
        {playlist.tracks.map((track) => <Track track={track}/>)}
      </div>
    );
  }
}
