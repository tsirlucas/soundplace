import {Action, bindActionCreators, Dispatch} from 'redux';

import {actions as playerActions} from 'core/player';
import {actions as storageActions} from 'core/storage';
import {actions as tracksActions} from 'core/tracks';
import {RootState} from 'src/core';

type OwnProps = {
  entity: string;
  id: string;
};
export const mapStateToProps = ({tracks, player}: RootState, ownProps: OwnProps) => ({
  player,
  tracks,
  ...ownProps,
});

export const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  actions: bindActionCreators(
    {
      play: playerActions.playMusic,
      requestTracks: tracksActions.requestTracks,
      saveMusic: storageActions.saveMusic,
      setList: playerActions.setList,
      toggle: playerActions.toggle,
    },
    dispatch,
  ),
});

export type MapDispatchToProps = ReturnType<typeof mapDispatchToProps>;
export type MapStateToProps = ReturnType<typeof mapStateToProps>;
