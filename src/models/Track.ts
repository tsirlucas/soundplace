import {Cover} from './Cover';

export interface Track {
  id: string;
  name: string;
  channel: string;
  cover: Cover;
}

export interface IndexedTracks {
  [index: string]: Track;
}
