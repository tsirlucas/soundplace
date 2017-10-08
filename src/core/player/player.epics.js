import Cookie from 'js-cookie';
import { combineEpics } from 'redux-observable';

import { Observable } from '../../util/RXImports';

import { INIT_PLAYER, PLAYER_CLEAR, PLAYER_DESTROY } from './player.constants';
import { initPlayerSuccess } from './player.actions';

const mockedState = {
  isPlaying: false,
  currentIndex: 0,
  lastCurrentTime: 4.184037,
  currentlyPlaying: {
    name: 'titulo mockado',
    artist: 'artista mockado',
    album: 'album mockado',
    url: 'https://ia800703.us.archive.org/3/items/mythium/JLS_ATI.mp3'
  },
  tracklist: [
    {
      name: 'titulo mockado',
      artist: 'artista mockado',
      album: 'album mockado',
      url: 'https://ia800703.us.archive.org/3/items/mythium/JLS_ATI.mp3'
    },
    {
      name: 'titulo mockado 2',
      artist: 'artista mockado 2',
      album: 'album mockado',
      url: 'https://ia800703.us.archive.org/3/items/mythium/BS_TF.mp3'
    },
    {
      name: 'titulo mockado 3',
      artist: 'artista mockado 3',
      album: 'album mockado',
      url: 'https://ia800703.us.archive.org/3/items/mythium/SSB12_28_03_T.mp3'
    }
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
