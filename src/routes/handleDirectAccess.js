import { browserHistory } from './routes.config';

// Handle direct access to some url so history.back lead to dashboard before closes app

const handleDirectAccess = () => {
  const { pathname } = window.location;
  const search = window.location.search;

  if (pathname !== '/') {
    const splitedPath = pathname.split('/').filter((item) => item !== '');
    browserHistory.replace('/');

    splitedPath.reduce((currPath, nextPath) => {
      browserHistory.push(currPath);
      return currPath.concat('/' + nextPath);
    });
    browserHistory.push(pathname + search);
  }
};

export default handleDirectAccess;
