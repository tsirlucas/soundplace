import {REQUEST_SONGS} from './songs.constants';
import {getSongs} from '../api/api.service';
import {requestSongsSuccess} from './songs.actions';

const songsEpic = (action$) => {
  return action$
    .ofType(REQUEST_SONGS)
    .mergeMap(({payload}) => getSongs(payload).map(requestSongsSuccess));
};

export default songsEpic;
