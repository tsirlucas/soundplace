import {Component, h} from 'preact';
import {connect} from 'preact-redux';

import {PlayerService} from 'services';

import {Icon} from '../Icons';
import {
  mapDispatchToProps,
  MapDispatchToProps,
  mapStateToProps,
  MapStateToProps,
} from './Player.selectors';
import PlayerProgress from './Progressbar';

type Props = MapStateToProps & MapDispatchToProps;

class PlayerComponent extends Component<Props, {}> {
  componentWillMount() {
    PlayerService.getInstance().setPlayer(this.props.player, this.props.actions);
  }

  componentWillReceiveProps(nextProps) {
    PlayerService.getInstance().setPlayer(nextProps.player, nextProps.actions);
  }

  render({isDesktop, scrollbarWidth, width, player, actions, playerClass}: Props) {
    const parsedWidth = isDesktop ? width - scrollbarWidth : width;
    const style = `width: ${parsedWidth}px;`;

    const hasPrevious = PlayerService.getInstance().hasPrev();
    const hasNext = PlayerService.getInstance().hasNext();

    const {list} = this.props.player;
    const currentlyPlaying = list && list[this.props.player.currentId];
    return (
      <div id="player" style={style} className={playerClass}>
        {currentlyPlaying && [
          player.duration ? (
            <PlayerProgress currTime={player.currentTime} duration={player.duration} />
          ) : null,
          <div className="player-content-left">
            <div id="playing-details">
              <div
                id="playing-cover"
                style={`background-image: url(${currentlyPlaying.cover.small});`}
              />
              <div id="playing-data">
                <div className="music">
                  <strong>{currentlyPlaying.name}</strong>
                </div>
                <div className="artist">{currentlyPlaying.channel}</div>
              </div>
            </div>
          </div>,
          <div className="player-content-right">
            <div id="player-controls">
              <div
                className={`prev-button ${!hasPrevious ? 'disabled' : ''}`}
                onClick={hasPrevious ? PlayerService.getInstance().prev : () => null}
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
                onClick={hasNext ? PlayerService.getInstance().next : () => null}
              >
                <Icon icon="SKIP_BUTTON" size="24" color={hasNext ? 'white' : 'gray'} />
              </div>
            </div>
          </div>,
        ]}
      </div>
    );
  }
}

export const Player = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlayerComponent);
