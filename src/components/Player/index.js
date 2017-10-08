import Cookie from 'js-cookie';
import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { bindActionCreators } from 'redux';

import { toggle, next, previous } from '../../core/player/player.actions';
import Icon from '../Icons/Icons';

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
    const playerElement = document.querySelector('#player-element');
    const { player } = this.props;

    player.currentTime ? playerElement.currentTime = player.currentTime : null;
  }

  componentDidUpdate() {
    this.setPlayer(this.props.player);
  }

  setPlayer = (player) => {
    const playerElement = document.querySelector('#player-element');

    this.setMediaSession();

    playerElement.addEventListener('ended', this.onEnded);
    playerElement.addEventListener('timeupdate', this.onTimeUpdate);

    player.isPlaying ? playerElement.play() : playerElement.pause();
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
      navigator.mediaSession.setActionHandler('previoustrack', this.props.actions.previous);
      navigator.mediaSession.setActionHandler('nexttrack', this.props.actions.next);
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

  render({ isDesktop, scrollbarWidth, width, player, actions }, state) {
    const parsedWidth = isDesktop ? width - 250 - scrollbarWidth : width;
    const style = `width: ${parsedWidth}px;`;

    return (
      <div id='player' style={style} className={player.hiding ? 'hiding-player' : 'showing-player'}>
        <div id='playing-details'>
          <div className='music'>{player.currentlyPlaying.name}</div>
          <div className='artist'>{player.currentlyPlaying.artist}</div>
        </div>
        <div id='player-controls'>
          <div className='prev-button'
               onClick={this.hasPrevious(player.currentIndex) ? actions.previous : () => null}>
            <Icon icon='PREVIOUS_BUTTON' size='24'/>
          </div>
          <div className='toggle-button' onClick={actions.toggle}>
            {player.isPlaying ? <Icon icon='PAUSE_BUTTON' size='24'/> :
              <Icon icon='PLAY_BUTTON' size='24'/>}
          </div>
          <div className='next-button'
               onClick={this.hasNext(player.currentIndex) ? actions.next : () => null}>
            <Icon icon='SKIP_BUTTON' size='24'/>
          </div>
        </div>
        <audio id='player-element' src={player.currentlyPlaying.url}/>
      </div>
    );
  }
}
