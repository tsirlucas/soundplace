import {Component, h} from 'preact';

import {Props as ContainerProps} from '../AppLayout.container';

type Props = {
  user: ContainerProps['user'];
  actions: {
    subscribeUser: ContainerProps['userActions']['subscribeUser'];
  };
};
export class Topbar extends Component<Props, null> {
  componentDidMount() {
    this.props.actions.subscribeUser();
  }

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
            <div style="width: 36px" />
          </div>
        )}
      </div>
    );
  }
}
