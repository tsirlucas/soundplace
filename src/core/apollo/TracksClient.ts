import {concat} from 'rxjs';
import {map} from 'rxjs/operators';

import {Track} from 'models';

import {Client} from './Client';
import {GET_TRACKS, GET_TRACKS_BY_IDS, SUBSCRIBE_TRACKS, SUBSCRIBE_TRACKS_BY_IDS} from './queries';

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
    this.client
      .watchQuery<{playlistTracks: Track[]}>({
        query: GET_TRACKS,
        variables: {
          playlistId,
        },
      })
      .pipe(map((res) => ({operation: 'NONE', item: res.data.playlistTracks})));

  public subscribe = (playlistId: string) => {
    return concat(
      this.get(playlistId),
      this.client
        .subscribe<{data: {playlistTracks: {operation: string; item: Track}}}>({
          query: SUBSCRIBE_TRACKS,
          variables: {
            playlistId,
          },
        })
        .pipe(map((res) => res.data.playlistTracks)),
    );
  };

  private getByIds = (ids: string[]) => {
    return this.client
      .watchQuery<{tracks: Track[]}>({
        query: GET_TRACKS_BY_IDS,
        variables: {
          ids,
        },
      })
      .pipe(map((res) => ({operation: 'NONE', item: res.data.tracks})));
  };

  public subscribeByIds = (ids: string[]) => {
    return concat(
      this.getByIds(ids),
      this.client
        .subscribe<{data: {tracks: {operation: string; item: Track}}}>({
          query: SUBSCRIBE_TRACKS_BY_IDS,
          variables: {
            ids,
          },
        })
        .pipe(map((res) => res.data.tracks)),
    );
  };
}
