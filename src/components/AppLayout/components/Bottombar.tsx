import React from 'react';
import {privateRoutes} from 'src/routes/routes.config';

import {Icon} from '../../Icons/Icons';

export const Bottombar = ({changeRoute}) => (
  <div className="bottom-bar">
    {privateRoutes.filter((route) => route.header).map((privRoute, i) => (
      <label className="bottom-bar-item" key={i}>
        <input
          type="radio"
          name="tab-bar"
          value={privRoute.path}
          checked={location.hash.includes(privRoute.path)}
          disabled={location.hash === `#${privRoute.path}`}
          readOnly
          onClick={() => changeRoute(privRoute.path)}
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
