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
    currentlyPlaying: {
      name: 'Place',
      artist: 'Lucy Rose',
      album: 'Like I Used To',
      artwork: [{
        src: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d4/Like_I_Used_To%2C_Lucy_Rose%27s_cover.jpg/220px-Like_I_Used_To%2C_Lucy_Rose%27s_cover.jpg',
        sizes: '220x220',
        type: 'image/jpg'
      }]
    },
    tracklist: [
      {
        name: 'Place',
        artist: 'Lucy Rose',
        album: 'Like I Used To',
        duration: '2:54',
        artwork: [{
          src: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d4/Like_I_Used_To%2C_Lucy_Rose%27s_cover.jpg/220px-Like_I_Used_To%2C_Lucy_Rose%27s_cover.jpg',
          sizes: '220x220',
          type: 'image/jpg'
        }]
      },
      {
        name: 'Castle On The Hill',
        artist: 'Ed Sheeran',
        album: 'Divide',
        duration: '2:54',
        artwork: [{
          src: 'https://upload.wikimedia.org/wikipedia/en/4/45/Divide_cover.png',
          sizes: '300x300',
          type: 'image/png'
        }],
        youtubeID: '7Qp5vcuMIlk'
      },
      {
        name: 'Landslide',
        artist: 'Oh Wonder',
        album: 'Oh Wonder',
        duration: '2:54',
        artwork: [{
          src: 'https://upload.wikimedia.org/wikipedia/ru/thumb/d/da/Oh_Wonder_album.jpg/230px-Oh_Wonder_album.jpg',
          sizes: '230x230',
          type: 'image/jpg'
        }],
        youtubeID: 'PiGt9C76U0s'
      }
    ]
  }
;

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
