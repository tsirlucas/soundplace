import {combineReducers} from 'redux';

import ApiReducer from './core/api/api.reducer';
import PlayerReducer from './core/player/player.reducer';
import RoutesReducer from './core/router/router.reducer';
import PlaylistsReducer from './core/playlists/playlists.reducer';
import ArtistsReducer from './core/artists/artists.reducer';
import UserReducer from './core/user/user.reducer';
import WindowReducer from './core/window/window.reducer';
import StorageReducer from './core/storage/storage.reducer';
import SongsReducer from './core/songs/songs.reducer';

const appReducer = combineReducers({
  api: ApiReducer,
  user: UserReducer,
  route: RoutesReducer,
  window: WindowReducer,
  player: PlayerReducer,
  playlists: PlaylistsReducer,
  artists: ArtistsReducer,
  storage: StorageReducer,
  songs: SongsReducer,
});

export default appReducer;
