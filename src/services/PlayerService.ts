import Cookie from 'js-cookie';

import {MapDispatchToProps, MapStateToProps} from 'components/Player/Player.selectors';
import {STREAM_SERVER_URL} from 'core/api/api.constants';
import {Track} from 'src/models';

export class PlayerService {
  private static instance: PlayerService;
  private secure = process.env.NODE_ENV === 'production';
  private player: HTMLAudioElement;
  private playerState: MapStateToProps['player'];
  private actions: MapDispatchToProps['actions'];

  private constructor() {
    this.player = new Audio();
    this.player.preload = 'none';
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new PlayerService();
    }

    return this.instance;
  }

  private setMediaSession = () => {
    const track = this.playerState.list[this.playerState.currentId];
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: track.name,
        artist: track.channel,
        artwork: [{src: track.cover.big, type: 'image/png'}],
      });

      navigator.mediaSession.setActionHandler('play', this.actions.toggle);
      navigator.mediaSession.setActionHandler('pause', this.actions.toggle);
      navigator.mediaSession.setActionHandler('previoustrack', this.hasPrev() ? this.prev : null);
      navigator.mediaSession.setActionHandler('nexttrack', this.hasNext() ? this.next : null);
    }
  };

  getStreamURL = (currentlyPlaying: Track) => {
    if (!currentlyPlaying) return null;
    const {id} = currentlyPlaying;
    return `${STREAM_SERVER_URL}/${id}`;
  };

  updateCache = () => {
    Cookie.set('playerState', JSON.stringify(this.playerState), {secure: this.secure});
  };

  safePlay = () => {
    if (this.player.src.includes(this.playerState.currentId)) {
      this.player.play();
    } else {
      // Avoids closing media session
      const currTrack = this.playerState.list[this.playerState.currentId];
      this.player.pause();
      const temporaryPlayer = new Audio();
      temporaryPlayer.preload = 'none';
      temporaryPlayer.src = this.getStreamURL(currTrack);
      temporaryPlayer.addEventListener('ended', this.walk);
      temporaryPlayer.addEventListener('timeupdate', this.keepStateUpdated);
      temporaryPlayer.play().then(() => {
        this.player.src = '';
        this.player = temporaryPlayer;
      });
    }
  };

  setPlayer = (player: MapStateToProps['player'], actions: MapDispatchToProps['actions']) => {
    this.actions = actions;
    this.playerState = player;
    this.setMediaSession();

    if (player.isPlaying) {
      this.safePlay();
    } else {
      this.player.pause();
    }
  };

  walkIndex = (value: number) => {
    const {currentId} = this.playerState;
    const list = Object.keys(this.playerState.list);
    return list.indexOf(currentId) + value;
  };

  play = (trackId: string) => {
    return this.actions.play(trackId);
  };

  next = () => {
    const index = this.walkIndex(1);
    this.play(Object.keys(this.playerState.list)[index]);
  };

  prev = () => {
    const index = this.walkIndex(-1);
    this.play(Object.keys(this.playerState.list)[index]);
  };

  hasNext = () => {
    if (!this.playerState.list) return false;
    const currIndex = this.walkIndex(0);
    return currIndex !== Object.keys(this.playerState.list).length - 1;
  };

  hasPrev = () => {
    if (!this.playerState.list) return false;
    const currIndex = this.walkIndex(0);
    return currIndex !== 0;
  };

  keepStateUpdated = (e) => {
    const {currentTime, duration} = e.target as HTMLAudioElement;
    this.actions.updateTime({currentTime, duration});
    Cookie.set(
      'playerState',
      JSON.stringify({
        ...this.playerState,
        lastCurrentTime: currentTime,
        lastDuration: duration,
      }),
      {secure: this.secure},
    );
  };

  walk = () => {
    if (this.hasNext()) {
      this.next();
    }
  };
}
