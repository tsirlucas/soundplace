import {concat} from 'rxjs';
import {map} from 'rxjs/operators';

import {Playlist} from 'models';

import {Client} from './Client';
import {GET_PLAYLISTS, SUBSCRIBE_PLAYLISTS} from './queries';

export class PlaylistsClient {
  private static instance: PlaylistsClient;
  public client: Client;

  private constructor() {
    this.client = Client.getInstance();
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new PlaylistsClient();
    }

    return this.instance;
  }
  public get = () =>
    this.client
      .watchQuery<{currentUserPlaylists: Playlist[]}>({query: GET_PLAYLISTS})
      .pipe(map((res) => ({operation: 'NONE', item: res.data.currentUserPlaylists})));

  public subscribe = () => {
    return concat(
      this.get(),
      this.client
        .subscribe<{data: {currentUserPlaylists: {operation: string; item: Playlist}}}>({
          query: SUBSCRIBE_PLAYLISTS,
        })
        .pipe(map((res) => res.data.currentUserPlaylists)),
    );
  };
}
