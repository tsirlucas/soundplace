import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { bindActionCreators } from 'redux';
import { saveMusic } from '../../core/storage/storage.actions';
import { getSongs } from '../../core/songs/songs.actions';
import { playFromSongs, toggle } from '../../core/player/player.actions';

import Track from './components/Track';

function mapStateToProps({ songs, player }) {
  return { songs, player };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({ saveMusic, getSongs, play: playFromSongs, toggle }, dispatch) };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Songs extends Component {
  componentWillMount() {
    this.props.actions.getSongs(this.props.entity, this.props.id);
  }

  save = (track) => {
    const { tracks } = this.props.songs;
    this.props.actions.saveMusic(track, tracks.indexOf(track));
  };

  play = (track) => {
    const { tracks } = this.props.songs;
    this.props.actions.play(tracks, tracks.indexOf(track));
  };

  pause = () => {
    this.props.actions.toggle();
  };

  isPlaying = (track) => {
    if (this.props.player) {
      const { currentlyPlaying } = this.props.player;
      return currentlyPlaying.spotify_id === track.spotify_id
        && this.props.player.isPlaying;
    }
    return false;
  };

  render({ songs, actions }) {

    if (!songs.tracks) return null;

    return (
      <section id="playlist">
        <header className="playlist-header">
          <div className="playlist-image" style={`background-image: url(${songs.cover})`}/>
          <h1 className="playlist-name">{songs.name}</h1>
        </header>
        <main className="playlist-content">
          <ul className="tracks-list">
            {songs.tracks.map((track) => <Track track={track} play={this.play} pause={this.pause}
                                                onSave={this.save} playing={this.isPlaying(track)}/>)}
          </ul>
        </main>
      </section>
    );
  }
}
