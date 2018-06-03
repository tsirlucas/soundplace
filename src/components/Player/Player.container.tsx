import Cookie from 'js-cookie';
import {Component, h} from 'preact';
import {connect} from 'preact-redux';

import {STREAM_SERVER_URL} from '../../core/api/api.constants';
import {Icon} from '../Icons';
import {
  mapDispatchToProps,
  MapDispatchToProps,
  mapStateToProps,
  MapStateToProps,
} from './Player.selectors';
import PlayerProgress from './Progressbar';

const secure = process.env.NODE_ENV === 'production';

type Props = MapStateToProps & MapDispatchToProps;

class PlayerComponent extends Component<Props, null> {
  playerElement: HTMLAudioElement;

  componentWillReceiveProps(nextProps: Props) {
    Cookie.set('playerState', JSON.stringify(nextProps.player), {secure});
  }

  componentDidMount() {
    this.playerElement = document.querySelector('#player-element');
    const {player} = this.props;

    player.currentTime ? (this.playerElement.currentTime = player.currentTime) : null;
  }

  componentDidUpdate() {
    this.setPlayer(this.props.player);
  }

  setPlayer = (player) => {
    this.playerElement = document.querySelector('#player-element');

    this.setMediaSession();

    this.playerElement.addEventListener('ended', this.onEnded);
    this.playerElement.addEventListener('timeupdate', this.onTimeUpdate);

    player.isPlaying ? this.playerElement.play() : this.playerElement.pause();
  };

  next = () => {
    const currId = this.props.player.currentId;
    const list = Object.keys(this.props.player.list);
    const nextIndex = list.indexOf(currId) + 1;
    this.props.actions.play(list[nextIndex]);
  };

  previous = () => {
    const currId = this.props.player.currentId;
    const list = Object.keys(this.props.player.list);
    const nextIndex = list.indexOf(currId) - 1;
    this.props.actions.play(list[nextIndex]);
  };

  setMediaSession = () => {
    if ('mediaSession' in navigator) {
      const {player} = this.props;
      const {currentId} = player;
      const currentlyPlaying = player.list[currentId];

      navigator.mediaSession.metadata = new window['MediaMetadata']({
        title: currentlyPlaying.name,
        artist: currentlyPlaying.artist.name,
        album: currentlyPlaying.album.name,
        artwork: [{src: currentlyPlaying.album.cover, type: 'image/png'}],
      });

      navigator.mediaSession.setActionHandler('play', this.props.actions.toggle);
      navigator.mediaSession.setActionHandler('pause', this.props.actions.toggle);
      navigator.mediaSession.setActionHandler(
        'previoustrack',
        this.hasPrevious() ? this.previous : null,
      );
      navigator.mediaSession.setActionHandler('nexttrack', this.hasNext() ? this.next : null);
    }
  };

  onTimeUpdate = (e) => {
    Cookie.set(
      'playerState',
      JSON.stringify({
        ...this.props.player,
        lastCurrentTime: e.target.currentTime,
      }),
      {secure},
    );
  };

  onEnded = () => {
    if (this.hasNext()) {
      this.next();
    }
  };

  hasPrevious = () => {
    if (!this.props.player.list) return false;
    const currId = this.props.player.currentId;
    return Object.keys(this.props.player.list).indexOf(currId) !== 0;
  };

  hasNext = () => {
    if (!this.props.player.list) return false;
    const currId = this.props.player.currentId;
    const list = Object.keys(this.props.player.list);
    return list.indexOf(currId) !== list.length - 1;
  };

  getStreamURL = (currentlyPlaying) => {
    if (!currentlyPlaying) return null;
    const {youtubeID, name, artist} = currentlyPlaying;
    if (youtubeID) return `${STREAM_SERVER_URL}/${youtubeID}`;
    const search = `${name} - ${artist.name} - official audio`;
    return `${STREAM_SERVER_URL}/${search}`;
  };

  render({isDesktop, scrollbarWidth, width, player, actions, playerClass}: Props) {
    const parsedWidth = isDesktop ? width - scrollbarWidth : width;
    const style = `width: ${parsedWidth}px;`;

    const hasPrevious = this.hasPrevious();
    const hasNext = this.hasNext();
    console.log(this.props.player);
    const {list} = this.props.player;
    const currentlyPlaying = list && list[this.props.player.currentId];

    return (
      <div id="player" style={style} className={playerClass}>
        {currentlyPlaying && [
          <PlayerProgress player={this.playerElement} />,
          <div className="player-content-left">
            <div id="playing-details">
              <div
                id="playing-cover"
                style={`background-image: url(${currentlyPlaying.album.cover});`}
              />
              <div id="playing-data">
                <div className="music">
                  <strong>{currentlyPlaying.name}</strong>
                </div>
                <div className="artist">{currentlyPlaying.artist.name}</div>
              </div>
            </div>
          </div>,
          <div className="player-content-right">
            <div id="player-controls">
              <div
                className={`prev-button ${!hasPrevious ? 'disabled' : ''}`}
                onClick={this.hasPrevious() ? this.previous : () => null}
              >
                <Icon icon="PREVIOUS_BUTTON" size="24" color={hasPrevious ? 'white' : 'gray'} />
              </div>
              <div className="toggle-button" onClick={actions.toggle}>
                {player.isPlaying ? (
                  <Icon icon="PAUSE_BUTTON" size="24" color="white" />
                ) : (
                  <Icon icon="PLAY_BUTTON" size="24" color="white" />
                )}
              </div>
              <div
                className={`next-button ${!hasNext ? 'disabled' : ''}`}
                onClick={this.hasNext() ? this.next : () => null}
              >
                <Icon icon="SKIP_BUTTON" size="24" color={hasNext ? 'white' : 'gray'} />
              </div>
            </div>
          </div>,
        ]}
        <audio
          id="player-element"
          src={this.getStreamURL(currentlyPlaying)}
          preload="none"
          autoPlay
        />
      </div>
    );
  }
}

export const Player = connect(mapStateToProps, mapDispatchToProps)(PlayerComponent);
