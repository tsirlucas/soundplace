import {concat} from 'rxjs';
import {map} from 'rxjs/operators';

import {User} from 'models';

import {Client} from './Client';
import {GET_USER, SUBSCRIBE_USER} from './queries';

export class UserClient {
  private static instance: UserClient;
  public client: Client;

  private constructor() {
    this.client = Client.getInstance();
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new UserClient();
    }

    return this.instance;
  }
  public get = () =>
    this.client
      .watchQuery<{currentUser: User}>({query: GET_USER})
      .pipe(map((res) => res.data.currentUser));

  public subscribe = () => {
    return concat(
      this.get(),
      this.client
        .subscribe<{data: {currentUser: {item: User}}}>({query: SUBSCRIBE_USER})
        .pipe(map((res) => res.data.currentUser.item)),
    );
  };
}
