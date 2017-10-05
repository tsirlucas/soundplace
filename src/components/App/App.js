import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import Topbar from './Topbar';
import Sidebar from './Sidebar';
import Bottombar from './Bottombar';
import StatusBar from './Statusbar';
import Networkbar from './Networkbar';

function mapStateToProps({ window, api }) {
  return { window, hasNetwork: api.hasNetwork };
}

@connect(mapStateToProps)
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

  render({ children }) {
    const { hasNetwork } = this.props;
    const { width } = this.props.window;

    const isDesktop = width > 765;
    const networkClass = this.getNetworkClass(hasNetwork);

    const child = document.querySelector("#application");
    const scrollbarWidth = width - child.offsetWidth;

    return (
      <section id="layout" className={networkClass}>
        {isDesktop ? <Sidebar /> : <Bottombar/>}
        {!isDesktop && <Topbar/>}
        <StatusBar />
        <Networkbar networkClass={networkClass} width={width} isDesktop={isDesktop} scrollbarWidth={scrollbarWidth}/>
        <div id="content">
          {children}
        </div>
      </section>
    );
  }
}
