import {InMemoryCache, NormalizedCacheObject} from 'apollo-cache-inmemory';
import {persistCache} from 'apollo-cache-persist';
import ApolloClient, {
  OperationVariables,
  SubscriptionOptions,
  WatchQueryOptions,
} from 'apollo-client';
import {ApolloLink} from 'apollo-link';
import {RetryLink} from 'apollo-link-retry';
import {WebSocketLink} from 'apollo-link-ws';
import {environment} from 'config';
import Cookie from 'js-cookie';
import localforage from 'localforage';
import {Observable} from 'rxjs';

export class Client {
  private static instance: Client;
  public client: ApolloClient<NormalizedCacheObject>;
  private socketUrl = `${environment.settings.apiUrl}/graphql`.replace(/http/, 'ws');

  private constructor() {
    const cache = new InMemoryCache();

    persistCache({
      cache,
      storage: localforage,
    });

    const wsLink = new WebSocketLink({
      uri: this.socketUrl,
      options: {
        reconnect: true,
        timeout: 30000,
        connectionParams: () => ({
          authorization: Cookie.get('token'),
        }),
      },
    });

    const link = ApolloLink.from([
      new RetryLink({
        delay: {
          initial: 300,
          max: Infinity,
          jitter: true,
        },
        attempts: {
          max: 3,
          retryIf: (error, _operation) => !!error,
        },
      }),
      wsLink,
    ]);

    this.client = new ApolloClient({
      link,
      cache,
    });

    this.client.subscribe;
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new Client();
    }

    return this.instance;
  }

  public watchQuery = <T>(options: WatchQueryOptions<OperationVariables>) =>
    Observable.from(
      this.client.watchQuery<T, OperationVariables>({...options, fetchPolicy: 'cache-and-network'}),
    )
      .take(2)
      .filter((res) => !!res.data);

  public subscribe = <T>(options: SubscriptionOptions<OperationVariables>) =>
    this.client.subscribe<T, OperationVariables>(options);
}
