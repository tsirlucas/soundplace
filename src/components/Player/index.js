import Cookie from 'js-cookie';
import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { bindActionCreators } from 'redux';

import { toggle, next, previous } from '../../core/player/player.actions';
import Icon from '../Icons/Icons';
import PlayerProgress from './Progressbar';
import { STREAM_SERVER_URL } from '../../core/api/api.constants';

const secure = process.env.NODE_ENV === 'production';

function mapStateToProps(state) {
  return { player: state.player };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({ toggle, next, previous }, dispatch) };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Player extends Component {

  componentWillReceiveProps(nextProps) {
    Cookie.set('playerState', JSON.stringify(nextProps.player), { secure });
  }

  componentDidMount() {
    this.playerElement = document.querySelector('#player-element');
    const { player } = this.props;

    player.currentTime ? this.playerElement.currentTime = player.currentTime : null;
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

  setMediaSession = () => {
    if ('mediaSession' in navigator) {
      const { player } = this.props;
      const { currentlyPlaying } = player;

      navigator.mediaSession.metadata = new window.MediaMetadata({
        title: currentlyPlaying.name,
        artist: currentlyPlaying.artist,
        album: currentlyPlaying.album,
        artwork: currentlyPlaying.artwork
      });

      navigator.mediaSession.setActionHandler('play', this.props.actions.toggle);
      navigator.mediaSession.setActionHandler('pause', this.props.actions.toggle);
      navigator.mediaSession.setActionHandler('previoustrack',
        this.hasPrevious(player.currentIndex) ? this.props.actions.previous : null);
      navigator.mediaSession.setActionHandler('nexttrack',
        this.hasNext(player.currentIndex) ? this.props.actions.next : null);
    }
  };

  onTimeUpdate = (e) => {
    Cookie.set('playerState', JSON.stringify({
      ...this.props.player.player,
      lastCurrentTime: e.target.currentTime
    }), { secure });
  };

  onEnded = () => {
    if (this.hasNext(this.props.player.currentIndex)) {
      this.props.actions.next();
    }
  };

  hasPrevious = (currIndex) => {
    return currIndex !== 0;
  };

  hasNext = (currIndex) => {
    return currIndex < this.props.player.tracklist.length - 1;
  };

  getStreamURL = ({ youtubeID, name, artist }) => {
    if (youtubeID) return STREAM_SERVER_URL + youtubeID;
    const search = `${name} - ${artist.name} - official audio`;
    return STREAM_SERVER_URL + search;
  };

  render({ isDesktop, scrollbarWidth, width, player, actions, playerClass }, state) {
    const parsedWidth = isDesktop ? width - scrollbarWidth : width;
    const style = `width: ${parsedWidth}px;`;

    const hasPrevious = this.hasPrevious(player.currentIndex);
    const hasNext = this.hasNext(player.currentIndex);

    return (
      <div id='player' style={style} className={playerClass}>
        <PlayerProgress player={this.playerElement}/>
        <div className="player-content-left">
          <div id='playing-details'>
            <div id='playing-cover' style={`background-image: url(${player.currentlyPlaying.artwork[0].src});`}/>
            <div id='playing-data'>
              <div className='music'><strong>{player.currentlyPlaying.name}</strong></div>
              <div className='artist'>{player.currentlyPlaying.artist.name}</div>
            </div>
          </div>
        </div>
        <div className="player-content-right">
          <div id='player-controls'>
            <div className={`prev-button ${!hasPrevious ? 'disabled' : ''}`}
                 onClick={this.hasPrevious(player.currentIndex) ? actions.previous : () => null}>
              <Icon icon='PREVIOUS_BUTTON' size='24' color={hasPrevious ? 'white' : 'gray'}/>
            </div>
            <div className='toggle-button' onClick={actions.toggle}>
              {player.isPlaying ? <Icon icon='PAUSE_BUTTON' size='24' color='white'/> :
                <Icon icon='PLAY_BUTTON' size='24' color='white'/>}
            </div>
            <div className={`next-button ${!hasNext ? 'disabled' : ''}`}
                 onClick={this.hasNext(player.currentIndex) ? actions.next : () => null}>
              <Icon icon='SKIP_BUTTON' size='24' color={hasNext ? 'white' : 'gray' }/>
            </div>
          </div>
        </div>
        <audio id='player-element' src={this.getStreamURL(player.currentlyPlaying)} preload="none" autoPlay/>
      </div>
    );
  }
}
