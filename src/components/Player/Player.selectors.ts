import {Action, bindActionCreators, Dispatch} from 'redux';

import {actions as playerActions} from 'core/player';
import {actions as storageActions} from 'core/storage';
import {actions as tracksActions} from 'core/tracks';
import {RootState} from 'src/core';

type OtherProps = {
  isDesktop: boolean;
  scrollbarWidth: number;
  width: number;
  playerClass: string;
};

export const mapStateToProps = ({player}: RootState, otherProps: OtherProps) => ({
  player,
  ...otherProps,
});

export const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  actions: bindActionCreators(
    {
      saveMusic: storageActions.saveMusic,
      requestTracks: tracksActions.requestTracks,
      play: playerActions.playMusic,
      toggle: playerActions.toggle,
    },
    dispatch,
  ),
});

export type MapDispatchToProps = ReturnType<typeof mapDispatchToProps>;
export type MapStateToProps = ReturnType<typeof mapStateToProps>;
