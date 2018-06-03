import {combineReducers, Reducer} from 'redux';
import {DeepReadonly} from 'utility-types';

import {api} from 'core/api/api.reducer';
import {player} from 'core/player/player.reducer';
import {playlists} from 'core/playlists/playlists.reducer';
import {router} from 'core/router/router.reducer';
import {storage} from 'core/storage/storage.reducer';
import {tracks} from 'core/tracks/tracks.reducer';
import {user} from 'core/user/user.reducer';
import {window} from 'core/window/window.reducer';

const rootReducerObj = {
  api,
  user,
  router,
  window,
  player,
  playlists,
  storage,
  tracks,
};

type RootType = typeof rootReducerObj;
type UnboxReducer<T> = T extends Reducer<infer U> ? U : T;

// State should be readonly
export type RootState = DeepReadonly<{[P in keyof RootType]: UnboxReducer<RootType[P]>}>;

export const rootReducer = combineReducers<RootState>(rootReducerObj);
