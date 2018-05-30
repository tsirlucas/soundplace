import {REQUEST_PLAYLISTS} from './playlists.constants';
import {getPlaylists} from '../api/api.service';
import {requestPlaylistsSuccess} from './playlists.actions';

const playlistsEpic = (action$) => {
  return action$
    .ofType(REQUEST_PLAYLISTS)
    .mergeMap(() => getPlaylists().map(requestPlaylistsSuccess));
};

export default playlistsEpic;
