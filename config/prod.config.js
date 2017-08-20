import webpack from 'webpack';
import OfflinePlugin from 'offline-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import {CriticalPlugin} from 'webpack-plugin-critical';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export const prodPlugins = [
  new webpack.optimize.ModuleConcatenationPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new CopyWebpackPlugin([
    {
      from: './src/assets/manifest.json',
      to: './'
    }, {
      from: './src/assets/img',
      to: './img'
    }
  ]),
  new CriticalPlugin({src: 'index.html', inline: true, minify: true, dest:
  'index.html'}),
  new OfflinePlugin({
    relativePaths: false,
    publicPath: '/',
    updateStrategy: 'all',
    safeToUseOptionalCaches: true,
    caches: 'all',
    ServiceWorker: {
      navigateFallbackURL: '/',
      events: true
    },
    AppCache: false
  }),
  new webpack.optimize.UglifyJsPlugin({
    output: {
      comments: 0
    },
    compress: {
      unused: 1,
      warnings: 0
    }
  })
];

export const prodLoaders = [
  {
    test: /\.(scss|css)$/,
    loader: ExtractTextPlugin.extract('css-loader?sourceMap!postcss-loader!sass-loader?sourceMap')
  }
];
