import webpack from 'webpack';
import {GenerateSW} from 'workbox-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import CnameWebpackPlugin from 'cname-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackInlineSourcePlugin from 'html-webpack-inline-source-plugin';
import BrotliPlugin from 'brotli-webpack-plugin';
import postcssPresetEnv from 'postcss-preset-env';

export const prodPlugins = [
  new webpack.optimize.ModuleConcatenationPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
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
    swDest: './build/sw.js',
    clientsClaim: true,
    skipWaiting: true,
    navigateFallback: 'index.html',
    directoryIndex: 'index.html',
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/scontent\.xx\.fbcdn\.net\//,
        handler: 'cacheFirst',
        options: {
          cacheName: 'scontent-cache',
          expiration: {
            maxEntries: 200,
            maxAgeSeconds: 31536000,
          },
          cacheableResponse: {statuses: [0, 200, 201, 301, 304, 302]},
        },
      },
      {
        urlPattern: /^https:\/\/mosaic\.scdn\.co\//,
        handler: 'cacheFirst',
        options: {
          cacheName: 'mosaic-cache',
          expiration: {
            maxEntries: 200,
            maxAgeSeconds: 31536000,
          },
          cacheableResponse: {statuses: [0, 200, 201, 301, 304, 302]},
        },
      },
      {
        urlPattern: /^https:\/\/i\.scdn\.co\//,
        handler: 'cacheFirst',
        options: {
          cacheName: 'iscdn-cache',
          expiration: {
            maxEntries: 200,
            maxAgeSeconds: 31536000,
          },
          cacheableResponse: {statuses: [0, 200, 201, 301, 304, 302]},
        },
      },
      {
        urlPattern: /^https:\/\/pl\.scdn\.co\//,
        handler: 'cacheFirst',
        options: {
          cacheName: 'plscdn-cache',
          expiration: {
            maxEntries: 200,
            maxAgeSeconds: 31536000,
          },
          cacheableResponse: {statuses: [0, 200, 201, 301, 304, 302]},
        },
      },
      {
        urlPattern: /^https:\/\/youtube-cacheable-audio-stream\.herokuapp\.com\//,
        handler: 'cacheFirst',
        options: {
          cacheName: 'stream-cache',
          expiration: {
            maxEntries: 200,
            maxAgeSeconds: 31536000,
          },
          cacheableResponse: {statuses: [200, 201]},
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
  new HtmlWebpackInlineSourcePlugin(),
  new HtmlWebpackPlugin({
    template: './src/prod-index.html',
    filename: '404.html',
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
  new HtmlWebpackPlugin({
    template: './src/prod-index.html',
    filename: '200.html',
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
  new BrotliPlugin({
    asset: '[path].br[query]',
    test: /\.(js|css|html|svg)$/,
    threshold: 10240,
    minRatio: 0.8,
  }),
];

export const prodLoaders = [
  {
    test: /\.(scss|css)$/,
    loader: ExtractTextPlugin.extract({
      use: [
        'css-loader',
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
