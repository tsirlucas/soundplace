import {Component, h} from 'preact';

type State = {
  progressPercentage: number;
};

type Props = {
  player: HTMLAudioElement;
};

export default class PlayerProgress extends Component<Props, State> {
  componentWillReceiveProps(nextProps: Props) {
    nextProps.player.addEventListener('timeupdate', (e) => {
      const {currentTime, duration} = e.target as HTMLAudioElement;
      const progressPercentage = currentTime / duration * 100;
      this.setState({progressPercentage});
    });
  }

  render(_props, {progressPercentage}) {
    const style = `width: ${progressPercentage || 0}%;`;

    return <div id="player-progress-bar" style={style} />;
  }
}
