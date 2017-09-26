import { combineReducers } from 'redux';

import RoutesReducer from './core/router/router.reducer';
import PlaylistsReducer from './core/playlists/playlists.reducer';
import UserReducer from './core/user/user.reducer';

const appReducer = combineReducers({
  playlists: PlaylistsReducer,
  route: RoutesReducer,
  user: UserReducer
});

export default appReducer;
