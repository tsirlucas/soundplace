import {Cover} from './Cover';

export interface Playlist {
  id: string;
  name: string;
  cover: Cover;
}

export type IndexedPlaylists = {
  [index: string]: Playlist;
};
