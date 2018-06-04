import {Component, h} from 'preact';

import {RootState} from 'core';
import {actions as playerActions} from 'core/player';
import {actions as storageActions} from 'core/storage';
import {actions as tracksActions} from 'core/tracks';
import {Track as TrackType} from 'models';

import Track from './components/Track';

type Props = {
  entity: string;
  id: string;
  tracks: RootState['tracks'];
  player: RootState['player'];
  actions: {
    saveMusic: typeof storageActions.saveMusic;
    requestTracks: typeof tracksActions.requestTracks;
    play: typeof playerActions.playMusic;
    setList: typeof playerActions.setList;
    toggle: typeof playerActions.toggle;
  };
};

export class Tracks extends Component<Props, {}> {
  state = {};

  componentWillMount() {
    this.props.actions.requestTracks(this.props.id);
  }

  save = (track: TrackType) => {
    this.props.actions.saveMusic(track);
  };

  play = (track) => {
    this.props.actions.setList(this.props.tracks.data);
    this.props.actions.play(track.spotify_id);
  };

  pause = () => {
    this.props.actions.toggle();
  };

  isPlaying = (track) => {
    if (this.props.player) {
      const {currentId} = this.props.player;
      return currentId === track.spotify_id && this.props.player.isPlaying;
    }
    return false;
  };

  render({tracks}: Props) {
    if (!tracks.data) return null;

    return (
      <section id="playlist">
        <header className="playlist-header">
          <div
            className="playlist-image"
            style={`background-image: url(${tracks.listInfo.cover})`}
          />
          <h1 className="playlist-name">{tracks.listInfo.name}</h1>
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
