import {Action, bindActionCreators, Dispatch} from 'redux';

import {actions as storageActions} from 'core/storage';
import {actions as userActions} from 'core/user';
import {RootState} from 'src/core';

export const mapStateToProps = ({user}: RootState) => ({
  token: user && user.data && user.data.token,
});

export const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  actions: bindActionCreators(
    {
      setToken: userActions.setToken,
      subscribeCachedSongs: storageActions.subscribeCachedSongs,
    },
    dispatch,
  ),
});

export type MapDispatchToProps = ReturnType<typeof mapDispatchToProps>;
export type MapStateToProps = ReturnType<typeof mapStateToProps>;
