import {Component, h} from 'preact';

import {privateRoutes} from 'src/routes/routes.config';

import {Icon} from '../../Icons/Icons';
import {Props as ContainerProps} from '../AppLayout.container';

type Props = {
  actions: ContainerProps['routerActions'];
};

export class Bottombar extends Component<Props, null> {
  render({actions}) {
    return (
      <div className="bottom-bar">
        {privateRoutes.filter((route) => route.header).map((privRoute) => (
          <label className="bottom-bar-item">
            <input
              type="radio"
              name="tab-bar"
              value={privRoute.path}
              checked={location.hash.includes(privRoute.path)}
              onClick={() => actions.changeRoute(privRoute.path)}
            />
            <button className="bottom-bar-button">
              <div className="bottom-bar-item">
                <Icon icon={privRoute.icon} size="24" />
                <span>{privRoute.header}</span>
              </div>
            </button>
          </label>
        ))}
      </div>
    );
  }
}
