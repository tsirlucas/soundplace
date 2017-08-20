import webpack from 'webpack';
import Dashboard from 'webpack-dashboard/plugin';
import BrowserSyncPlugin from 'browser-sync-webpack-plugin';

export const devPlugins = [
  new BrowserSyncPlugin({
    host: 'localhost',
    port: 9000,
    notify:false,
    proxy: 'http://localhost:9100/'
  }, {reload: false}),
  new Dashboard(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
];

export const devServerconfig = {
  devServer: {
    port: process.env.PORT || 9100,
    host: '0.0.0.0',
    hot: true,
    compress: true,
    contentBase: './src/index',
    historyApiFallback: true
  }
};

export const devLoaders = [
  {
    test: /\.(scss|css)$/,
    loader: 'style-loader!css-loader?sourceMap!postcss-loader!sass-loader?sourceMap'
  }
];
