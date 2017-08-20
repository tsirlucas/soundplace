export App from '../components/App/App';
export Layout from '../components/App/Layout';

export { store } from '../main';
export { privatizeRoutes } from './auth';
export { browserHistory } from './routes.config';
export { goTo, replaceFor } from '../core/router/router.service';
