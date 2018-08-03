import {Action, bindActionCreators, Dispatch} from 'redux';

import {RootState} from 'core';
import {actions as storageActions} from 'core/storage';

export const mapStateToProps = ({storage, tracks}: RootState) => ({storage, tracks});

export const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  actions: bindActionCreators(
    {
      loadStorageStatus: storageActions.loadStorageStatus,
      requestCachedSongs: storageActions.requestCachedSongs,
      deleteMusic: storageActions.deleteMusic,
    },
    dispatch,
  ),
});

export type MapDispatchToProps = ReturnType<typeof mapDispatchToProps>;
export type MapStateToProps = ReturnType<typeof mapStateToProps>;
