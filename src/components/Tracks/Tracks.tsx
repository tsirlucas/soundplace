import {Component, h} from 'preact';

import {RootState} from 'core';
import {actions as playerActions} from 'core/player';
import {actions as storageActions} from 'core/storage';
import {actions as tracksActions} from 'core/tracks';
import {Playlist, Track as TrackType} from 'models';

import Track from './components/Track';

type Props = {
  entity: string;
  id: string;
  playlist: Playlist;
  tracks: RootState['tracks'];
  player: RootState['player'];
  actions: {
    saveMusic: typeof storageActions.saveMusic;
    deleteMusic: typeof storageActions.deleteMusic;
    subscribeToTracks: typeof tracksActions.subscribeToPlaylistTracks;
    unsubscribeFromTracks: typeof tracksActions.unsubscribeFromPlaylistTracks;
    play: typeof playerActions.playMusic;
    setList: typeof playerActions.setList;
    toggle: typeof playerActions.toggle;
  };
};

export class Tracks extends Component<Props, {}> {
  state = {};

  componentDidMount() {
    this.props.actions.subscribeToTracks(this.props.id);
  }

  componentWillUnmount() {
    this.props.actions.unsubscribeFromTracks();
  }

  save = (track: TrackType) => {
    this.props.actions.saveMusic(track);
  };

  delete = (track: TrackType) => {
    this.props.actions.deleteMusic(track.id);
  };

  play = (track) => {
    const listIds = Object.keys(this.props.tracks.playlist);
    const list = listIds.reduce((curr, next) => {
      curr[next] = this.props.tracks.data[next];
      return curr;
    }, {});
    this.props.actions.setList(list);
    this.props.actions.play(track.id);
  };

  pause = () => {
    this.props.actions.toggle();
  };

  isPlaying = (track) => {
    if (this.props.player) {
      const {currentId} = this.props.player;
      return currentId === track.id && this.props.player.isPlaying;
    }
    return false;
  };

  render({tracks, playlist}: Props) {
    if (!tracks.data || !playlist) return null;
    const playlistTracks = Object.keys(tracks.playlist).map((id) => tracks.data[id]);

    return (
      <section id="playlist">
        <header className="playlist-header">
          <div
            className="playlist-image"
            style={`background-image: url(${playlist.cover.medium})`}
          />
          <h1 className="playlist-name">{playlist.name}</h1>
        </header>
        <main className="playlist-content">
          <ul className="tracks-list">
            {Object.values(playlistTracks).map((track) => (
              <Track
                status={tracks.saved[track.id] ? tracks.saved[track.id].status : 'NOT-SAVED'}
                track={track}
                play={this.play}
                pause={this.pause}
                onSave={this.save}
                onDelete={this.delete}
                playing={this.isPlaying(track)}
              />
            ))}
          </ul>
        </main>
      </section>
    );
  }
}
