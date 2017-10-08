import Cookie from 'js-cookie';
import { combineEpics } from 'redux-observable';

import { Observable } from '../../util/RXImports';

import { INIT_PLAYER, PLAYER_CLEAR, PLAYER_DESTROY } from './player.constants';
import { initPlayerSuccess } from './player.actions';

const mockedArtwork = [
  { src: 'https://dummyimage.com/96x96', sizes: '96x96', type: 'image/png' },
  { src: 'https://dummyimage.com/128x128', sizes: '128x128', type: 'image/png' },
  { src: 'https://dummyimage.com/192x192', sizes: '192x192', type: 'image/png' },
  { src: 'https://dummyimage.com/256x256', sizes: '256x256', type: 'image/png' },
  { src: 'https://dummyimage.com/384x384', sizes: '384x384', type: 'image/png' },
  { src: 'https://dummyimage.com/512x512', sizes: '512x512', type: 'image/png' }
];

const mockedState = {
  isPlaying: false,
  currentIndex: 0,
  lastCurrentTime: 4.184037,
  currentlyPlaying: {
    name: 'All This Is',
    artist: 'Joe L.\'s Studio',
    album: 'Some Mocked',
    artwork: mockedArtwork,
    url: 'https://ia800703.us.archive.org/3/items/mythium/JLS_ATI.mp3'
  },
  tracklist: [
    {
      name: 'All This Is',
      artist: 'Joe L.\'s Studio',
      album: 'Some Mocked',
      artwork: mockedArtwork,
      url: 'https://ia800703.us.archive.org/3/items/mythium/JLS_ATI.mp3'
    },
    {
      name: 'The Forsaken',
      artist: 'Broadwing Studio',
      album: 'Some Mocked',
      artwork: mockedArtwork,
      url: 'https://ia800703.us.archive.org/3/items/mythium/BS_TF.mp3'
    },
    {
      name: 'On The Waterfront',
      artist: 'Popeye\'s',
      album: 'Some Mocked',
      artwork: mockedArtwork,
      url: 'https://ia800703.us.archive.org/3/items/mythium/PNY04-05_OTW.mp3'
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
