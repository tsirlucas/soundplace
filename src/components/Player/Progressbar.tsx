import {Component, h} from 'preact';

type State = {
  progressPercentage: number;
};

type Props = {
  onTimeUpdate: (cb: EventListenerOrEventListenerObject) => void;
};

export default class PlayerProgress extends Component<Props, State> {
  componentWillReceiveProps(nextProps: Props) {
    nextProps.onTimeUpdate((e) => {
      const {currentTime, duration} = e.target as HTMLAudioElement;
      const progressPercentage = (currentTime / duration) * 100;
      this.setState({progressPercentage});
    });
  }

  render(_props, {progressPercentage}) {
    const style = `width: ${progressPercentage || 0}%;`;

    return <div id="player-progress-bar" style={style} />;
  }
}
