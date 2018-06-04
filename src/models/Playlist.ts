export interface Playlist {
  id: string;
  name: string;
  cover: string;
}

export type IndexedPlaylists = {
  [index: string]: Playlist;
};
