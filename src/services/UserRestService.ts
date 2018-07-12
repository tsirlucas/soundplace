import {environment} from 'config';
import Cookie from 'js-cookie';

import {RestService} from './RestService';

export class UserRestService extends RestService {
  private static instance: UserRestService;

  private constructor() {
    super({
      baseUrl: `${environment.settings.apiUrl}/data`,
      endpoint: '/api/me',
      token: Cookie.get('token'),
    });
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new UserRestService();
    }

    return this.instance;
  }
}
