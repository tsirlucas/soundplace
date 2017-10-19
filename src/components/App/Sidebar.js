import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { bindActionCreators } from 'redux';


import Icon from '../Icons/Icons';
import { getUser } from '../../core/user/user.actions';
import { privateRoutes } from '../../routes/routes.config';
import { changeRoute } from '../../core/router/router.actions';

function mapStateToProps({ user, route }) {
  return { user, route };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({ getUser, changeRoute }, dispatch) };
}

@connect(mapStateToProps, mapDispatchToProps)
class Sidebar extends Component {

  componentDidMount() {
    this.props.actions.getUser();
  }

  render() {
    const { user } = this.props;
    const { changeRoute } = this.props.actions;

    return (
      <aside id="sidebar">
        <div id="brand">
          <img src={user.image} alt={user.name} className="brand-img"/>
          <h3 className="brand-name">{user.name}</h3>
        </div>
        <Navigation>
          { privateRoutes.childRoutes.map((route) => <NavigationItem onClick={() => changeRoute(route.path)}
                                                                     header={route.header}
                                                                     icon={route.icon}
                                                                     active={route.path === location.pathname}/>)}
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

const NavigationItem = ({ header, icon, active, onClick }) => (
  <li className="brand-nav-item" onClick={onClick}>
    <div className="brand-nav-icon">
      <Icon icon={icon} size={34} color={active ? 'white' : null}/>
    </div>
    <span style={active ? 'color: white' : null}>{header}</span>
  </li>
);

export default Sidebar;
