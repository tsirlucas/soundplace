import {combineReducers} from 'redux';

import RoutesReducer from './core/router/router.reducer';
import PlaylistsReducer from './core/playlists/playlists.reducer';

const appReducer = combineReducers({
  playlists: PlaylistsReducer,
  route: RoutesReducer
});

export default appReducer;
