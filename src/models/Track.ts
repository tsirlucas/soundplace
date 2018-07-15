import {Playlist} from './Playlist';

interface Album {
  cover: string;
  name: string;
}

interface ExternalUrls {
  spotify: string;
}

interface Artist {
  id: string;
  name: string;
  type: string;
  uri: string;
  href: string;
  external_urls: ExternalUrls;
}

export interface Track {
  id: string;
  name: string;
  duration: number;
  album: Album;
  artist: Artist;
  downloading?: boolean;
}

export interface IndexedTracks {
  [index: string]: Track;
}

export interface TrackList extends Playlist {
  tracks: Track[];
}
