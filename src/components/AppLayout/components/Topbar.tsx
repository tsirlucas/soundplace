import {Component, h} from 'preact';

import {Icon} from 'components';

import {Props as ContainerProps} from '../AppLayout.container';

type Props = {
  user: ContainerProps['user'];
  actions: {
    subscribeUser: ContainerProps['userActions']['subscribeUser'];
    unsubscribeUser: ContainerProps['userActions']['unsubscribeUser'];
    import: ContainerProps['userActions']['import'];
  };
};
export class Topbar extends Component<Props, null> {
  onLoadImageError = (img) => {
    img.src = '/assets/img/avatar.jpeg';
  };

  render() {
    const {user} = this.props;

    return (
      <div class="top-bar">
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
      </div>
    );
  }
}
