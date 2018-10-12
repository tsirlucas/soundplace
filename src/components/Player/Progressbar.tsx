import React, {Component} from 'react';

type State = {
  progressPercentage: number;
};

type Props = {
  currTime: number;
  duration: number;
};

export default class PlayerProgress extends Component<Props, State> {
  state = {
    progressPercentage: 0,
  };
  shouldComponentUpdate(_nextProps, nextState) {
    return this.state.progressPercentage !== nextState.progressPercentage;
  }

  componentWillReceiveProps(nextProps: Props) {
    const {currTime, duration} = nextProps;
    const progressPercentage = (currTime / duration) * 100;
    this.setState({progressPercentage});
  }

  render() {
    const {progressPercentage} = this.state;
    const style = {width: `${progressPercentage}%`};

    return <div id="player-progress-bar" style={style} />;
  }
}
