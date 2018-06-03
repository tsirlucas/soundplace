import Cookie from 'js-cookie';
import {Epic} from 'redux-observable';
import {Observable} from 'rxjs';

import {RootState} from 'core';

import {ActionsValues} from '../rootActions';
import {actions} from './player.actions';
import {PlayerState} from './player.reducer';

const cachedPlayerState = () => JSON.parse(Cookie.get('playerState') || null) as PlayerState;

const initPlayerEpic: Epic<ActionsValues, RootState> = (action$) =>
  action$.ofType(actions.initPlayer.getType()).mergeMap(() =>
    Observable.of(cachedPlayerState())
      .map(actions.initPlayerSuccess)
      .catch(() => Observable.of(actions.initPlayerError())),
  );

export default initPlayerEpic;
