import {Observable} from 'rxjs';

import {Track} from 'models';

import {Client} from './Client';
import {GET_TRACKS, SUBSCRIBE_TRACKS} from './queries';

export class TracksClient {
  private static instance: TracksClient;
  public client: Client;

  private constructor() {
    this.client = Client.getInstance();
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new TracksClient();
    }

    return this.instance;
  }
  public get = (playlistId: string) =>
    Observable.fromPromise(
      this.client.query<{playlistTracks: Track[]}>({
        query: GET_TRACKS,
        variables: {
          playlistId,
        },
      }),
    ).map((res) => ({operation: 'NONE', item: res.data.playlistTracks}));

  public subscribe = (playlistId: string) => {
    return Observable.concat(
      this.get(playlistId),
      this.client
        .subscribe<{data: {playlistTracks: {operation: string; item: Track}}}>({
          query: SUBSCRIBE_TRACKS,
          variables: {
            playlistId,
          },
        })
        .map((res) => res.data.playlistTracks),
    );
  };
}
