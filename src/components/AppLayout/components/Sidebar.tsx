import {Component, h} from 'preact';

import {Icon} from 'components/Icons/Icons';
import {privateRoutes} from 'src/routes/routes.config';

import {Props as ContainerProps} from '../AppLayout.container';

type Props = {
  height: number;
  router: ContainerProps['router'];
  user: ContainerProps['user'];
  actions: {
    subscribeUser: ContainerProps['userActions']['subscribeUser'];
    unsubscribeUser: ContainerProps['userActions']['unsubscribeUser'];
    import: ContainerProps['userActions']['import'];
    changeRoute: ContainerProps['routerActions']['changeRoute'];
  };
};

export class Sidebar extends Component<Props, null> {
  componentDidMount() {
    this.props.actions.subscribeUser();
  }

  componentWillUnmount() {
    this.props.actions.unsubscribeUser();
  }

  onLoadImageError = (img) => {
    img.src = '/assets/img/avatar.jpeg';
  };

  render({user}: Props) {
    const {changeRoute} = this.props.actions;

    return (
      <aside id="sidebar">
        {user && (
          <div id="brand">
            <img
              src={user.image}
              ref={(img) => img && (img['onError'] = () => this.onLoadImageError(img))}
              alt={user.name}
              className="brand-img"
            />
            <h3 className="brand-name">{user.name}</h3>
            {user.importing ? (
              <span className="icon-spinner">
                <Icon icon="SYNC" size="24" color="white" />
              </span>
            ) : (
              <div onClick={this.props.actions.import}>
                <Icon icon="SYNC" size="24" color="white" />
              </div>
            )}
          </div>
        )}
        <Navigation>
          {privateRoutes
            .filter((route) => route.header)
            .map((route) => (
              <NavigationItem
                onClick={() => changeRoute(route.path)}
                header={route.header}
                icon={route.icon}
                active={location.hash.includes(route.path)}
              />
            ))}
        </Navigation>
      </aside>
    );
  }
}

const Navigation = ({children}: {children?: JSX.Element[]}) => (
  <ul className="brand-nav">{children}</ul>
);

const NavigationItem = ({header, icon, active, onClick}) => (
  <li className="brand-nav-item" onClick={onClick}>
    <div className="brand-nav-icon">
      <Icon icon={icon} size="34" color={active ? 'white' : null} />
    </div>
    <span style={active ? 'color: white' : null}>{header}</span>
  </li>
);
