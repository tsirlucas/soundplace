import {$Values} from 'utility-types';

import {Actions as ApiActions} from './api';
import {Actions as PlayerActions} from './player';
import {Actions as PlaylistsActions} from './playlists';
import {Actions as RouterActions} from './router';
import {Actions as StorageActions} from './storage';
import {Actions as TracksActions} from './tracks';
import {Actions as UserActions} from './user';
import {Actions as WindowActions} from './window';

export interface Actions
  extends ApiActions,
    PlayerActions,
    PlaylistsActions,
    RouterActions,
    StorageActions,
    TracksActions,
    UserActions,
    WindowActions {}

export type ActionsValues = $Values<Actions>
