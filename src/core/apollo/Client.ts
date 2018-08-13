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
import {from} from 'rxjs';
import {filter, mergeMap, take} from 'rxjs/operators';

export class Client {
  private static instance: Client;
  private resolver: Function;
  public client: Promise<ApolloClient<NormalizedCacheObject>> = new Promise(
    (res) => (this.resolver = res),
  );
  private socketUrl = `${environment.settings.apiUrl}/graphql`.replace(/http/, 'ws');

  private constructor() {
    this.generateClient();
  }

  private async generateClient() {
    const cache = new InMemoryCache();

    await persistCache({
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

    this.resolver(
      new ApolloClient({
        link,
        cache,
        defaultOptions: {
          query: {
            fetchPolicy: 'cache-and-network',
          },
        },
      }),
    );
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new Client();
    }

    return this.instance;
  }

  public watchQuery = <T>(options: WatchQueryOptions<OperationVariables>) => {
    return from(
      this.client.then((client) =>
        from(
          client.watchQuery<T, OperationVariables>({
            ...options,
            fetchPolicy: 'cache-and-network',
          }),
        ).pipe(
          take(2),
          filter((res) => !!res.data),
        ),
      ),
    ).pipe(mergeMap((res) => res));
  };

  public subscribe = <T>(options: SubscriptionOptions<OperationVariables>) =>
    from(this.client.then((client) => client.subscribe<T, OperationVariables>(options))).pipe(
      mergeMap((res) => res),
    );
}
