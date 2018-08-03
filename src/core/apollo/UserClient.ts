import {Observable} from 'rxjs';

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
    Observable.fromPromise(this.client.query<{currentUser: User}>({query: GET_USER})).map(
      (res) => res.data.currentUser,
    );

  public subscribe = () => {
    return Observable.concat(
      this.get(),
      this.client
        .subscribe<{data: {currentUser: {item: User}}}>({query: SUBSCRIBE_USER})
        .map((res) => res.data.currentUser.item),
    );
  };
}
