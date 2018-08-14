import {Action, bindActionCreators, Dispatch} from 'redux';

import {actions as playerActions} from 'core/player';
import {actions as userActions} from 'core/user';
import {RootState} from 'src/core';

export const mapStateToProps = ({player, window, api, router, user}: RootState) => ({
  window,
  router,
  api,
  user: user.data,
  hasNetwork: api.hasNetwork,
  showPlayer: player.currentId,
});

export const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  actions: bindActionCreators(
    {
      initPlayer: playerActions.initPlayer,
    },
    dispatch,
  ),
  userActions: bindActionCreators(
    {
      subscribeUser: userActions.subscribeUser,
      unsubscribeUser: userActions.unsubscribeUser,
      import: userActions.import,
    },
    dispatch,
  ),
});

export type MapDispatchToProps = ReturnType<typeof mapDispatchToProps>;
export type MapStateToProps = ReturnType<typeof mapStateToProps>;
