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
    subscribeTracks: typeof tracksActions.subscribeTracks;
    unsubscribeTracks: typeof tracksActions.unsubscribeTracks;
    play: typeof playerActions.playMusic;
    setList: typeof playerActions.setList;
    toggle: typeof playerActions.toggle;
  };
};

export class Tracks extends Component<Props, {}> {
  state = {};

  componentWillMount() {
    this.props.actions.subscribeTracks(this.props.id);
  }

  componentWillUnmount() {
    this.props.actions.unsubscribeTracks();
  }

  save = (track: TrackType) => {
    this.props.actions.saveMusic(track);
  };

  play = (track) => {
    this.props.actions.setList(this.props.tracks.data);
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

    return (
      <section id="playlist">
        <header className="playlist-header">
          <div className="playlist-image" style={`background-image: url(${playlist.cover})`} />
          <h1 className="playlist-name">{playlist.name}</h1>
        </header>
        <main className="playlist-content">
          <ul className="tracks-list">
            {Object.values(tracks.data).map((track) => (
              <Track
                track={track}
                play={this.play}
                pause={this.pause}
                onSave={this.save}
                playing={this.isPlaying(track)}
              />
            ))}
          </ul>
        </main>
      </section>
    );
  }
}
