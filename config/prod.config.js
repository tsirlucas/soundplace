import webpack from 'webpack';
import WorkboxPlugin from 'workbox-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import CnameWebpackPlugin from 'cname-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackInlineSourcePlugin from 'html-webpack-inline-source-plugin';

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
  new WorkboxPlugin({
    swDest: './build/sw.js',
    clientsClaim: true,
    skipWaiting: true,
    handleFetch: true,
    navigateFallback: 'index.html',
    directoryIndex: 'index.html',
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/scontent\.xx\.fbcdn\.net\//,
        handler: 'cacheFirst',
        options: {
          cache: {
            name: 'scontent-cache',
            maxEnteries: 200,
            maxAgeSeconds: 31536000,
          },
          cacheableResponse: {statuses: [0, 200, 201, 301, 304, 302]},
        },
      },
      {
        urlPattern: /^https:\/\/mosaic\.scdn\.co\//,
        handler: 'cacheFirst',
        options: {
          cache: {
            name: 'mosaic-cache',
            maxEnteries: 200,
            maxAgeSeconds: 31536000,
          },
          cacheableResponse: {statuses: [0, 200, 201, 301, 304, 302]},
        },
      },
      {
        urlPattern: /^https:\/\/i\.scdn\.co\//,
        handler: 'cacheFirst',
        options: {
          cache: {
            name: 'iscdn-cache',
            maxEnteries: 200,
            maxAgeSeconds: 31536000,
          },
          cacheableResponse: {statuses: [0, 200, 201, 301, 304, 302]},
        },
      },
      {
        urlPattern: /^https:\/\/pl\.scdn\.co\//,
        handler: 'cacheFirst',
        options: {
          cache: {
            name: 'plscdn-cache',
            maxEnteries: 200,
            maxAgeSeconds: 31536000,
          },
          cacheableResponse: {statuses: [0, 200, 201, 301, 304, 302]},
        },
      },
      {
        urlPattern: /^https:\/\/youtube-cacheable-audio-stream\.herokuapp\.com\//,
        handler: 'cacheFirst',
        options: {
          cache: {
            name: 'stream-cache',
            maxEnteries: 200,
            maxAgeSeconds: 31536000,
          },
          cacheableResponse: {statuses: [200, 201]},
        },
      },
    ],
  }),
  new UglifyJsPlugin({
    parallel: true,
    extractComments: true,
    uglifyOptions: {
      ie8: true,
      ecma: 8,
      warnings: false,
      mangle: true,
      compress: {
        ecma: 5,
        hoist_props: true,
        dead_code: true,
      },
    },
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
];

export const prodLoaders = [
  {
    test: /\.(scss|css)$/,
    loader: ExtractTextPlugin.extract({use: ['css-loader', 'postcss-loader', 'sass-loader']}),
  },
];
