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
      case true:
        return 'without-network';
      case false:
        return 'network';
      default:
        return '';
    }
  };

  getPlayerClass = (showPlayer) => {
    switch (true) {
      case !showPlayer:
        return 'hiding-player';
      case showPlayer:
        return 'showing-player';
      default:
        return '';
    }
  };

  componentWillMount() {
    this.props.actions.initPlayer();
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
    const {width, height, scrollbarWidth} = window;

    const isDesktop = width > 765;
    const networkClass = this.getNetworkClass(hasNetwork);
    const playerClass = this.getPlayerClass(showPlayer);

    return (
      <section id="layout" className={`${networkClass} ${showPlayer ? 'showing-player' : ''}`}>
        {isDesktop ? (
          <Sidebar
            user={user}
            router={router}
            height={height}
            actions={{...routerActions, ...userActions}}
          />
        ) : (
          <Bottombar actions={routerActions} />
        )}
        {!isDesktop && <Topbar user={user} actions={userActions} />}
        <StatusBar error={api.message} hasPlayer={showPlayer} />
        <Networkbar
          networkClass={networkClass}
          width={width}
          isDesktop={isDesktop}
          scrollbarWidth={scrollbarWidth}
        />
        <div id="content">{children}</div>
        {showPlayer && (
          <Player
            width={width}
            isDesktop={isDesktop}
            scrollbarWidth={scrollbarWidth}
            playerClass={playerClass}
          />
        )}
      </section>
    );
  }
}

export const AppLayout = connect(mapStateToProps, mapDispatchToProps)(AppLayoutComponent);
