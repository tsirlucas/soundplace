import { REQUEST_ARTISTS } from './artists.constants';
import { getArtists } from '../api/api.service';
import { requestArtistsSuccess } from './artists.actions';

const artistsEpic = (action$) => {
  return action$.ofType(REQUEST_ARTISTS)
    .mergeMap(() => getArtists()
      .map(requestArtistsSuccess));
};

export default artistsEpic;
