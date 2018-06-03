import {Action, bindActionCreators, Dispatch} from 'redux';

import {RootState} from 'core';
import {actions as playlistsActions} from 'core/playlists';
import {actions as routerActions} from 'core/router';

export const mapStateToProps = ({playlists}: RootState) => ({playlists: playlists.data});

export const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  actions: bindActionCreators(
    {
      requestPlaylists: playlistsActions.requestPlaylists,
      changeRoute: routerActions.changeRoute,
    },
    dispatch,
  ),
});

export type MapDispatchToProps = ReturnType<typeof mapDispatchToProps>;
export type MapStateToProps = ReturnType<typeof mapStateToProps>;
