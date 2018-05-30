import {combineEpics} from 'redux-observable';
import Cookie from 'js-cookie';

import {Observable} from '../../util/RXImports';

import {INIT_PLAYER, PLAYER_CLEAR, PLAYER_DESTROY} from './player.constants';
import {initPlayerSuccess, initPlayerError} from './player.actions';

const initPlayerEpic = (action$) =>
  action$
    .ofType(INIT_PLAYER)
    .mergeMap(() => Observable.of(JSON.parse(Cookie.get('playerState'))).map(initPlayerSuccess))
    .catch(() => Observable.of(initPlayerError()));

const clearPlayerEpic = (action$) =>
  action$
    .ofType(PLAYER_CLEAR)
    .delay(300)
    .mapTo({type: PLAYER_DESTROY});

export default combineEpics(initPlayerEpic, clearPlayerEpic);
