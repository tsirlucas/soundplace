import {browserHistory} from './routes.config';

// Handle direct access to some url so history.back lead to dashboard before closes app

const handleDirectAccess = () => {
  const hash = window.location.hash;

  if (hash !== '#/') {
    const splitedPath = hash.split('/').filter((item) => item !== '#');

    browserHistory.replace('/');

    splitedPath.reduce((currPath, nextPath) => {
      browserHistory.push(currPath + nextPath);
      return currPath.concat(nextPath + '/');
    }, '/');
  }
};

export default handleDirectAccess;
