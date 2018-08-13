import {Component, h} from 'preact';
import {connect} from 'preact-redux';

import {Player} from '../Player';
import {
  mapDispatchToProps,
  MapDispatchToProps,
  mapStateToProps,
  MapStateToProps,
} from './AppLayout.selectors';
import {Bottombar, Networkbar, Sidebar, StatusBar, Topbar} from './components';

export type Props = MapDispatchToProps &
  MapStateToProps & {
    children: HTMLElement;
  };

class AppLayoutComponent extends Component<Props, {}> {
  getNetworkClass = (hasNetwork) => {
    switch (hasNetwork) {
      case 'NO':
        return 'without-network';
      case 'YES':
        return 'network';
      default:
        return '';
    }
  };

  getPlayerClass = (showPlayer) => {
    switch (true) {
      case !showPlayer:
        return 'hiding-player';
      case !!showPlayer:
        return 'showing-player';
      default:
        return '';
    }
  };

  componentWillMount() {
    this.props.actions.initPlayer();
    this.props.userActions.subscribeUser();
  }

  componentWillUnmount() {
    this.props.userActions.unsubscribeUser();
  }

  render({
    children,
    hasNetwork,
    showPlayer,
    window,
    router,
    routerActions,
    userActions,
    user,
    api,
  }: Props) {
    const {width} = window;

    const isDesktop = width > 765;
    const networkClass = this.getNetworkClass(hasNetwork);
    const playerClass = this.getPlayerClass(showPlayer);

    return isDesktop ? (
      <section id="player-container">
        <section id="sidebar-container">
          <Sidebar user={user} router={router} actions={{...routerActions, ...userActions}} />
          <section id="layout">
            <Networkbar networkClass={networkClass} width={width} isDesktop={isDesktop} />
            <div id="content">{children}</div>

            <StatusBar error={api.message} />
          </section>
        </section>
        {showPlayer && <Player playerClass={playerClass} />}
      </section>
    ) : (
      <section id="layout">
        <Topbar user={user} actions={userActions} />
        <Networkbar networkClass={networkClass} width={width} isDesktop={isDesktop} />
        <div id="content">{children}</div>
        <StatusBar error={api.message} />
        {showPlayer && <Player playerClass={playerClass} />}
        <Bottombar actions={routerActions} />
      </section>
    );
  }
}

export const AppLayout = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppLayoutComponent);
