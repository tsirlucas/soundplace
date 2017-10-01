import { combineReducers } from 'redux';

import RoutesReducer from './core/router/router.reducer';
import PlaylistsReducer from './core/playlists/playlists.reducer';
import UserReducer from './core/user/user.reducer';
import WindowReducer from './core/window/window.reducer';

const appReducer = combineReducers({
  user: UserReducer,
  route: RoutesReducer,
  window: WindowReducer,
  playlists: PlaylistsReducer
});

export default appReducer;
