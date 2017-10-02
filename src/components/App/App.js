import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import Topbar from './Topbar';
import Sidebar from './Sidebar';
import Bottombar from './Bottombar';

function mapStateToProps({ window }) {
  return { window };
}

@connect(mapStateToProps)
export default class App extends Component {

  render({ children }) {
    const { width } = this.props.window;
    const isDesktop = width > 765;

    return (
      <section id="layout">
        {isDesktop ? <Sidebar /> : <Bottombar/>}
        {!isDesktop && <Topbar/>}
        <div id="content">
          {children}
        </div>
      </section>
    );
  }
}
