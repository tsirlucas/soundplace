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
      <div class="bottom-bar">
        {privateRoutes.childRoutes.map((privRoute) =>
          <label class="bottom-bar-item">
            <input
              type="radio"
              name="tab-bar"
              value={privRoute.path}
              checked={route.path === privRoute.path}
              onClick={() => actions.changeRoute(privRoute.path)}/>
            <button class="bottom-bar-button">
              {/*<Icon icon="HOME" size='24'/>*/}
              <span>
              {privRoute.header}
              </span>
            </button>
          </label>
        )}
      </div>
    );
  }
}
