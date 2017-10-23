import { h, Component } from 'preact';

export default class PlayerProgress extends Component {

  componentWillReceiveProps(nextProps) {
    nextProps.player.addEventListener('timeupdate', this.onTimeUpdate);
  }

  onTimeUpdate = (e) => {
    const { currentTime, duration } = e.target;
    const progressPercentage = parseInt(((currentTime / duration) * 100), 10);
    this.setState({ progressPercentage });
  };

  render(props, { progressPercentage }) {
    const style = `width: ${progressPercentage || 0}%;`;

    return (
      <div id='player-progress-bar' style={style}/>
    );
  }
}
