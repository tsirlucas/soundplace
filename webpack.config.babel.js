import path from 'path';
import {loaders} from './config/loaders';
import {plugins} from './config/common.config';
import {prodPlugins, prodLoaders} from './config/prod.config';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

const ENV = process.env.NODE_ENV || 'development';

const resolvePath = (value) => path.resolve(__dirname, value);

if (ENV === 'development') {
  var {devPlugins, devServerconfig, devLoaders} = require('./config/dev.config');
}

const envPlugins = ENV === 'development' ? devPlugins : prodPlugins;

const envLoaders = ENV === 'development' ? devLoaders : prodLoaders;

module.exports = {
  entry: {
    bundle: ['react-hot-loader/patch', './src/index.tsx'],
  },

  output: {
    path: resolvePath('./build'),
    filename: '[name].js',
  },
  resolve: {
    alias: {
      src: resolvePath('src/'),
      views: resolvePath('src/views/'),
      components: resolvePath('src/components/'),
      config: resolvePath('src/environment'),
      core: resolvePath('src/core/'),
      models: resolvePath('src/models/'),
      services: resolvePath('src/services/'),
      style: resolvePath('src/style/'),
      util: resolvePath('src/util/'),
      react: 'preact-compat',
      'react-dom': 'preact-compat',
      'preact-compat': 'preact-compat/dist/preact-compat',
    },
    extensions: ['.js', '.json', '.ts', '.tsx', '.scss', '.sass'],
  },
  module: {
    rules: loaders.concat(envLoaders),
  },
  plugins: plugins.concat(envPlugins),
  optimization: {
    minimizer: [
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
          },
          dead_code: true,
        },
      }),
    ],
  },
  stats: {
    colors: true,
  },
  // devtool: 'source-map',
  devtool: ENV !== 'production' && 'eval',
  ...devServerconfig,
};
