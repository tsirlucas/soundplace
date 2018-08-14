import {Component, h} from 'preact';

import {Icon} from 'components/Icons/Icons';
import {privateRoutes} from 'src/routes/routes.config';

import {Props as ContainerProps} from '../AppLayout.container';

type Props = {
  changeRoute: (path: string) => void;
  user: ContainerProps['user'];
  actions: {
    subscribeUser: ContainerProps['userActions']['subscribeUser'];
    unsubscribeUser: ContainerProps['userActions']['unsubscribeUser'];
    import: ContainerProps['userActions']['import'];
  };
};

export class Sidebar extends Component<Props, null> {
  onLoadImageError = (img) => {
    img.src = '/assets/img/avatar.jpeg';
  };

  render({user}: Props) {
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
              <div onClick={this.props.actions.import} style="cursor:pointer;">
                <Icon icon="SYNC" size="24" color="white" />
              </div>
            )}
          </div>
        )}
        <Navigation>
          {privateRoutes.filter((route) => route.header).map((route) => (
            <NavigationItem
              onClick={() => this.props.changeRoute(route.path)}
              header={route.header}
              icon={route.icon}
              active={location.hash.includes(route.path)}
              disabled={location.hash === `#${route.path}`}
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

const NavigationItem = ({header, icon, active, onClick, disabled}) => (
  <li className="brand-nav-item" style={disabled ? 'pointer-events:none;' : ''} onClick={onClick}>
    <div className="brand-nav-icon">
      <Icon icon={icon} size="34" color={active ? 'white' : null} />
    </div>
    <span style={active ? 'color: white' : null}>{header}</span>
  </li>
);
