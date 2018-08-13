import webpack from 'webpack';
import {GenerateSW} from 'workbox-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import CnameWebpackPlugin from 'cname-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackInlineSourcePlugin from 'html-webpack-inline-source-plugin';
import postcssPresetEnv from 'postcss-preset-env';
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';

const WBStreamPlugin = {
  cacheWillUpdate: ({request, response}) => {
    caches.match(request.url, {ignoreSearch: true}).then((res) => {
      // ignore repeated songs
      if (res) {
        return null;
      }

      // cache only save=true param
      if (request.url.includes('?save=true')) {
        return response;
      }

      // ignore any other thing
      return null;
    });
  },
  cachedResponseWillBeUsed: ({request, cachedResponse}) => {
    if (cachedResponse) {
      return cachedResponse;
    }
    // this will match same url/diff query string where the original failed
    return caches.match(request.url, {ignoreSearch: true});
  },
};

export const prodPlugins = [
  new CopyWebpackPlugin([
    {
      from: './assets',
      to: './assets',
    },
    {
      from: './node_modules/raven-js/dist/raven.min.js',
      to: '.',
    },
    {
      from: './src/index.html',
      to: './assets/report.html',
    },
  ]),
  new GenerateSW({
    swDest: 'sw.js',
    clientsClaim: true,
    skipWaiting: true,
    importWorkboxFrom: 'local',
    navigateFallback: '/',
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/lh3\.googleusercontent\.com\//,
        handler: 'cacheFirst',
        options: {
          cacheName: 'googleusercontent-cache',
          expiration: {
            maxEntries: 100000,
            maxAgeSeconds: 31536000,
          },
          cacheableResponse: {statuses: [0, 200, 201, 301, 304, 302]},
        },
      },
      {
        urlPattern: /^https:\/\/i\.ytimg\.com\//,
        handler: 'cacheFirst',
        options: {
          cacheName: 'ytimg-cache',
          expiration: {
            maxEntries: 100000,
            maxAgeSeconds: 31536000,
          },
          cacheableResponse: {statuses: [0, 200, 201, 301, 304, 302]},
        },
      },
      {
        urlPattern: /^https:\/\/api-soundplace\.com\/stream\//,
        handler: 'cacheFirst',
        options: {
          cacheName: 'stream-cache',
          expiration: {
            maxEntries: 100000,
            maxAgeSeconds: 31536000,
          },

          cacheableResponse: {statuses: [0, 200, 201, 206, 301, 304, 302]},
          plugins: [WBStreamPlugin],
        },
      },
    ],
  }),
  new HtmlWebpackPlugin({
    template: './src/prod-index.html',
    filename: 'index.html',
    title: 'SoundPlace',
    excludeChunks: ['admin'],
    inlineSource: '(bundle.js|style.css)',
    removeRedundantAttributes: true,
    manifest: './assets/manifest.json',
    favicon: './assets/img/favicon.ico',
    minify: {
      collapseWhitespace: true,
      removeComments: true,
    },
    themeColor: '#242424',
  }),
  new HtmlWebpackInlineSourcePlugin(),
  new CnameWebpackPlugin({
    domain: 'www.soundplace.io',
  }),
];

if (process.env.ANALYZER) {
  prodPlugins.push(new BundleAnalyzerPlugin());
}

export const prodLoaders = [
  {
    test: /\.(scss|css)$/,
    loader: ExtractTextPlugin.extract({
      use: [
        {loader: 'css-loader', options: {minimize: true}},
        {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            plugins: () => [postcssPresetEnv()],
          },
        },
        'sass-loader',
      ],
    }),
  },
];
