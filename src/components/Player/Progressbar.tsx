import {Component, h} from 'preact';

type State = {
  progressPercentage: number;
};

type Props = {
  currTime: number;
  duration: number;
};

export default class PlayerProgress extends Component<Props, State> {
  shouldComponentUpdate(_nextProps, nextState) {
    return this.state.progressPercentage !== nextState.progressPercentage;
  }

  componentWillReceiveProps(nextProps: Props) {
    const {currTime, duration} = nextProps;
    const progressPercentage = (currTime / duration) * 100;
    this.setState({progressPercentage});
  }

  render(_props, {progressPercentage}) {
    const style = `width: ${progressPercentage || 0}%;`;

    return <div id="player-progress-bar" style={style} />;
  }
}
