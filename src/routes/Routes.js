import {h, Component} from 'preact';
import Router from 'react-router/Router';

import renderRoutes from './renderRoutes';
import handleDirectAccess from './handleDirectAccess';
import {routes, updateRoute, browserHistory} from './routes.config';

export default class Routes extends Component {
  shouldComponentUpdate() {
    return false;
  }

  componentWillMount() {
    let {store} = this.context;

    handleDirectAccess();
    this.unsubscribe = store.subscribe(updateRoute);
  }

  componentDidUnmount() {
    this.unsubscribe();
  }

  render() {
    return <Router history={browserHistory}>{renderRoutes(routes)}</Router>;
  }
}
