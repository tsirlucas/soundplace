import Router from 'react-router/Router';
import {Component, h} from 'preact';

import handleDirectAccess from './handleDirectAccess';
import renderRoutes from './renderRoutes';
import {browserHistory, routes, updateRoute} from './routes.config';

export class Routes extends Component<null, null> {
  unsubscribe: Function;

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
