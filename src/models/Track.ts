import {Cover} from './Cover';

export interface Track {
  id: string;
  name: string;
  channel: string;
  cover: Cover;
  downloading?: boolean;
}

export interface IndexedTracks {
  [index: string]: Track;
}
