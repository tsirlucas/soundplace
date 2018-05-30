import {h, Component} from 'preact';
import {connect} from 'preact-redux';
import {bindActionCreators} from 'redux';

import Topbar from './Topbar';
import Player from '../Player';
import Sidebar from './Sidebar';
import Bottombar from './Bottombar';
import StatusBar from './Statusbar';
import Networkbar from './Networkbar';

import {initPlayer} from '../../core/player/player.actions';

function mapStateToProps({window, api, player}) {
  return {window, hasNetwork: api.hasNetwork, showPlayer: player};
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators({initPlayer}, dispatch)};
}

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {
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

  getPlayerClass = (player) => {
    switch (true) {
      case player && player.hiding:
        return 'hiding-player';
      case player && !player.hiding:
        return 'showing-player';
      default:
        return '';
    }
  };

  componentWillMount() {
    this.props.actions.initPlayer();
  }

  render({children, hasNetwork, showPlayer, window}) {
    const {width, height, scrollbarWidth} = window;

    const isDesktop = width > 765;
    const networkClass = this.getNetworkClass(hasNetwork);
    const playerClass = this.getPlayerClass(showPlayer);

    return (
      <section id="layout" className={`${networkClass} ${showPlayer ? 'showing-player' : ''}`}>
        {isDesktop ? <Sidebar height={height} playerClass={playerClass} /> : <Bottombar />}
        {!isDesktop && <Topbar />}
        <StatusBar />
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
