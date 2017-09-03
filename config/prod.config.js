import webpack from 'webpack';
import SWPrecache from 'sw-precache-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
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
    }
  ]),
  new SWPrecache({
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/verkat\.free\.fr\//,
        handler: 'cacheFirst'
      }
    ],
    filename: 'sw.js',
    // importScripts: ['./service-worker.js'], only script changes are necessary
    dontCacheBustUrlsMatching: /./,
    navigateFallback: 'index.html',
    staticFileGlobsIgnorePatterns: [/\.map$/, /\.DS_Store/]
  }),
  new webpack.optimize.UglifyJsPlugin({
    output: {
      comments: 0
    },
    compress: {
      unused: 1,
      warnings: 0
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
    themeColor: '#fff' //MY_APP_HERE
  }),
  new HtmlWebpackInlineSourcePlugin(),
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
    themeColor: '#fff' //MY_APP_HERE
  }),
  new HtmlWebpackInlineSourcePlugin(),
  new CnameWebpackPlugin({
    domain: 'www.soundplace.io',
  }),
];

export const prodLoaders = [
  {
    test: /\.(scss|css)$/,
    loader: ExtractTextPlugin.extract('css-loader?sourceMap!postcss-loader!sass-loader?sourceMap')
  }
];
