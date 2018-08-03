import {InMemoryCache, NormalizedCacheObject} from 'apollo-cache-inmemory';
import {persistCache} from 'apollo-cache-persist';
import ApolloClient, {OperationVariables, QueryOptions, SubscriptionOptions} from 'apollo-client';
import {ApolloLink} from 'apollo-link';
import {RetryLink} from 'apollo-link-retry';
import {WebSocketLink} from 'apollo-link-ws';
import Cookie from 'js-cookie';
// import {environment} from 'config';
import localforage from 'localforage';

export class Client {
  private static instance: Client;
  public client: ApolloClient<NormalizedCacheObject>;

  private constructor() {
    const cache = new InMemoryCache();

    persistCache({
      cache,
      storage: localforage,
    });

    const wsLink = new WebSocketLink({
      uri: `ws://localhost:3004/graphql`,
      options: {
        reconnect: true,
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
  public query = <T>(options: QueryOptions<OperationVariables>) =>
    this.client.query<T, OperationVariables>(options);

  public subscribe = <T>(options: SubscriptionOptions<OperationVariables>) =>
    this.client.subscribe<T, OperationVariables>(options);
}
