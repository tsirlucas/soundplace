import Cookie from 'js-cookie';
import { combineEpics } from 'redux-observable';

import { Observable } from '../../util/RXImports';

import { INIT_PLAYER, PLAYER_CLEAR, PLAYER_DESTROY } from './player.constants';
import { initPlayerSuccess } from './player.actions';

const mockedState = {
  isPlaying: false,
  currentIndex: 0,
  currentlyPlaying: { name: 'titulo mockado', artist: 'artista mockado' },
  tracklist: [
    { name: 'titulo mockado', artist: 'artista mockado' },
    { name: 'titulo mockado 2', artist: 'artista mockado 2' },
    { name: 'titulo mockado 3', artist: 'artista mockado 3' }
  ]
};

const initPlayerEpic = (action$) =>
  action$.ofType(INIT_PLAYER)
    .mergeMap(() => Observable.of(mockedState)
      .delay(500)
      .map(initPlayerSuccess));

const clearPlayerEpic = (action$) =>
  action$.ofType(PLAYER_CLEAR)
    .delay(300)
    .mapTo({ type: PLAYER_DESTROY });

export default combineEpics(initPlayerEpic, clearPlayerEpic);
