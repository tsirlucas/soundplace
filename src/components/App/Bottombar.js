import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { bindActionCreators } from 'redux';

import Icon from '../Icons/Icons';
import { privateRoutes } from '../../routes/routes.config';
import { changeRoute } from '../../core/router/router.actions';

function mapStateToProps({ route }) {
  return { route };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({ changeRoute }, dispatch) };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class BottomNav extends Component {

  render({ actions, route }, { selectedOption }) {
    return (
      <div className="bottom-bar">
        {privateRoutes.childRoutes.map((privRoute) =>
          <label className="bottom-bar-item">
            <input
              type="radio"
              name="tab-bar"
              value={privRoute.path}
              checked={route.path === privRoute.path}
              onClick={() => actions.changeRoute(privRoute.path)}/>
            <button className="bottom-bar-button">
              <div className="bottom-bar-item">
                <Icon icon={privRoute.icon} size='24'/>
                <span>
                  {privRoute.header}
                </span>
              </div>
            </button>
          </label>
        )}
      </div>
    );
  }
}
