import Cookie from 'js-cookie';
import {Epic} from 'redux-observable';
import {of} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';

import {RootState} from 'core';

import {actions, Actions} from './player.actions';
import {PlayerState} from './player.reducer';

const cachedPlayerState = () => JSON.parse(Cookie.get('playerState') || null) as PlayerState;

type EpicActions =
  | Actions['initPlayer']
  | Actions['initPlayerSuccess']
  | Actions['initPlayerError'];

const initPlayerEpic: Epic<EpicActions, EpicActions, RootState> = (action$) =>
  action$.ofType(actions.initPlayer.getType()).pipe(
    mergeMap(() =>
      of(cachedPlayerState()).pipe(
        map(actions.initPlayerSuccess),
        catchError(() => of(actions.initPlayerError())),
      ),
    ),
  );

export default initPlayerEpic;
