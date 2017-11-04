import webpack from 'webpack';
import SWPrecache from 'sw-precache-webpack-plugin';
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
      to: './assets'
    },
    {
      from: './node_modules/raven-js/dist/raven.min.js',
      to: '.'
    },
    {
      from: './src/index.html',
      to: './assets/report.html'
    }
  ]),
  new SWPrecache({
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/scontent\.xx\.fbcdn\.net\//,
        handler: 'cacheFirst'
      },
      {
        urlPattern: /^https:\/\/mosaic\.scdn\.co\//,
        handler: 'cacheFirst'
      },
      {
        urlPattern: /^https:\/\/i\.scdn\.co\//,
        handler: 'cacheFirst'
      },
      {
        urlPattern: /^https:\/\/pl\.scdn\.co\//,
        handler: 'cacheFirst'
      },
      {
        urlPattern: /^https:\/\/youtube-cacheable-audio-stream\.herokuapp\.com\/getAudioStream\//,
        handler: 'cacheFirst',
        options: {
          successResponses: /20[01]/
        }
      }
    ],
    filename: 'sw.js',
    // importScripts: ['./service-worker.js'], only if script changes are necessary
    navigateFallback: 'index.html',
    staticFileGlobsIgnorePatterns: [/\.map$/, /\.DS_Store/],
    options: {
      cacheId: 'soundplace'
    }
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
        dead_code: true
      }
    }
  }),
  new HtmlWebpackPlugin({
    template: './src/prod-index.html',
    filename: 'index.html',
    title: 'SoundPlace',
    excludeChunks: ['admin'],
    inlineSource: '(bundle.js|style.css)',
    removeRedundantAttributes: true,
    manifest: './assets/manifest.json',
    favicon: "./assets/img/favicon.ico",
    minify: {
      collapseWhitespace: true,
      removeComments: true
    },
    themeColor: '#242424'
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
    favicon: "./assets/img/favicon.ico",
    minify: {
      collapseWhitespace: true,
      removeComments: true
    },
    themeColor: '#242424'
  }),
  new HtmlWebpackPlugin({
    template: './src/prod-index.html',
    filename: '200.html',
    title: 'SoundPlace',
    excludeChunks: ['admin'],
    inlineSource: '(bundle.js|style.css)',
    removeRedundantAttributes: true,
    manifest: './assets/manifest.json',
    favicon: "./assets/img/favicon.ico",
    minify: {
      collapseWhitespace: true,
      removeComments: true
    },
    themeColor: '#242424'
  }),
  new HtmlWebpackInlineSourcePlugin(),
  new CnameWebpackPlugin({
    domain: 'www.soundplace.io'
  })
];

export const prodLoaders = [
  {
    test: /\.(scss|css)$/,
    loader: ExtractTextPlugin.extract({ use: ['css-loader', 'postcss-loader', 'sass-loader'] })
  }
];
