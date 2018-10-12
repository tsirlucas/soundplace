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
    bundle: ['./src/index.tsx'],
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
    },
    extensions: ['.js', '.json', '.ts', '.tsx', '.scss', '.sass'],
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        extractComments: true,
        uglifyOptions: {
          compress: {
            reduce_vars: false,
            inline: true,
          },
        },
      }),
    ],
  },
  module: {
    rules: loaders.concat(envLoaders),
  },
  plugins: plugins.concat(envPlugins),
  stats: {
    colors: true,
  },
  // devtool: 'source-map',
  devtool: ENV !== 'production' && 'eval',
  ...devServerconfig,
};
