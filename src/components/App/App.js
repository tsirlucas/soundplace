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

    return (
      <section id="layout">
        {width > 765 ? <Sidebar /> : <Bottombar/>}
        {width <= 765 && <Topbar/>}
        <div id="content">
          {children}
        </div>
      </section>
    );
  }
}
