import { combineEpics } from 'redux-observable';
import { Observable } from '../../util/RXImports';

import { onResize } from './window.actions';
import { WATCH_RESIZE } from './window.constants';

const watchResizeEpic = (action$) => {
  return action$.ofType(WATCH_RESIZE)
    .mergeMap(() => Observable.fromEvent(window, 'resize')
      .map(onResize));
};

export default combineEpics(watchResizeEpic);
