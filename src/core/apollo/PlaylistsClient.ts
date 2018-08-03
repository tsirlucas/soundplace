import {Observable} from 'rxjs';

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
      .map((res) => ({operation: 'NONE', item: res.data.currentUserPlaylists}));

  public subscribe = () => {
    return Observable.concat(
      this.get(),
      this.client
        .subscribe<{data: {currentUserPlaylists: {operation: string; item: Playlist}}}>({
          query: SUBSCRIBE_PLAYLISTS,
        })
        .map((res) => res.data.currentUserPlaylists),
    );
  };
}
