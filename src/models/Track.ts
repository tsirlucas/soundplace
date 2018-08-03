export interface Track {
  id: string;
  name: string;
  channel: string;
  cover: string;
  downloading?: boolean;
}

export interface IndexedTracks {
  [index: string]: Track;
}
