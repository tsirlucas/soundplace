import {Action, bindActionCreators, Dispatch} from 'redux';

import {RootState} from 'src/core';

export const mapStateToProps = ({router, user}: RootState) => ({
  ...router,
  token: user && user.data && user.data.token,
});

export const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  actions: bindActionCreators({}, dispatch),
});

export type MapDispatchToProps = ReturnType<typeof mapDispatchToProps>;
export type MapStateToProps = ReturnType<typeof mapStateToProps>;
