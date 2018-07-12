import {environment} from 'config';
import Cookie from 'js-cookie';

import {Method, RestService} from './RestService';

export class PlaylistRestService extends RestService {
  private static instance: PlaylistRestService;

  private constructor() {
    super({
      baseUrl: `${environment.settings.apiUrl}/data`,
      endpoint: '/api/me/playlists',
      token: Cookie.get('token'),
    });
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new PlaylistRestService();
    }

    return this.instance;
  }

  public getTracks(playlistId: string) {
    return this.request(Method.GET, `/api/playlists/${playlistId}/tracks`);
  }
}
