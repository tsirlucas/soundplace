import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { bindActionCreators } from 'redux';

import { getUser } from '../../core/user/user.actions';
import { privateRoutes } from '../../routes/routes.config';

function mapStateToProps({ user }) {
  return { user };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({ getUser }, dispatch) };
}

@connect(mapStateToProps, mapDispatchToProps)
class Sidebar extends Component {

  componentDidMount() {
    this.props.actions.getUser();
  }

  render() {
    const { user } = this.props;

    return (
      <aside id="sidebar">
        <div id="brand">
          <img src={user.image} width="60" height="60" alt={user.name} className="brand-img"/>
          <h3 className="brand-name">{user.name}</h3>
        </div>
        <Navigation>
          { privateRoutes.childRoutes.map((route) => <NavigationItem header={route.header}/>)}
        </Navigation>
      </aside>
    );
  }
}

const Navigation = ({ children }) => (
  <ul className="brand-nav">
    {children}
  </ul>
);

const NavigationItem = ({ header }) => (
  <li className="brand-nav-item">
    <span>{header}</span>
  </li>
);

export default Sidebar;
