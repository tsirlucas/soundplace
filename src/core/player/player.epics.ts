import localforage from 'localforage';
import {Epic} from 'redux-observable';
import {from, of} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';

import {RootState} from 'core';

import {actions, Actions} from './player.actions';
import {PlayerState} from './player.reducer';

const cachedPlayerState = () => from(localforage.getItem('playerState') as Promise<PlayerState>);

type EpicActions =
  | Actions['initPlayer']
  | Actions['initPlayerSuccess']
  | Actions['initPlayerError'];

const initPlayerEpic: Epic<EpicActions, EpicActions, RootState> = (action$) =>
  action$.ofType(actions.initPlayer.getType()).pipe(
    mergeMap(() =>
      cachedPlayerState().pipe(
        map(actions.initPlayerSuccess),
        catchError(() => of(actions.initPlayerError())),
      ),
    ),
  );

export default initPlayerEpic;
