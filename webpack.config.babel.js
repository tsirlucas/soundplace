import path from 'path';
import {loaders} from './config/loaders';
import {plugins} from './config/common.config';
import {devPlugins, devServerconfig, devLoaders} from './config/dev.config';
import {prodPlugins, prodLoaders} from './config/prod.config';

const ENV = process.env.NODE_ENV || 'development';

const envPlugins = ENV === 'development' ? devPlugins : prodPlugins;

const envLoaders = ENV === 'development' ? devLoaders : prodLoaders;

module.exports = {
  entry: {
    app: [
      'react-hot-loader/patch',
      './src/index.js'
    ]
  },

  output: {
    path: path.resolve(__dirname, './build'),
    filename: '[name].[hash:8].js',
    chunkFilename: '[id].[hash:8].chunk.js',
    publicPath: '/'
  },

  resolve: {
    extensions: ['.js'],
    alias: {
      'react': 'preact-compat',
      'react-dom': 'preact-compat',
      "preact-compat": "preact-compat/dist/preact-compat"
    }
  },
  module: {
    rules: loaders.concat(envLoaders)
  },
  plugins: plugins.concat(envPlugins),
  stats: {
    colors: true
  },
  // devtool: 'source-map',
  devtool: ENV !== 'production' && 'eval',
  ...devServerconfig
};
