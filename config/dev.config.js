import BrowserSyncPlugin from 'browser-sync-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin';
import webpack from 'webpack';
import Dashboard from 'webpack-dashboard/plugin';

export const devPlugins = [
  new BrowserSyncPlugin(
    {
      host: 'localhost',
      port: 9000,
      notify: false,
      proxy: 'http://localhost:9100/',
    },
    {reload: false},
  ),
  new Dashboard(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
  new HtmlWebpackPlugin({
    template: './src/index.html',
    title: 'SoundPlace',
    filename: '200.html',
    removeRedundantAttributes: true,
    inject: false,
    manifest: './assets/manifest.json',
    favicon: './assets/img/favicon.ico',
    minify: {
      collapseWhitespace: true,
      removeComments: true,
    },
    themeColor: '#fff', //MY_APP_HERE
  }),
  new HtmlWebpackPlugin({
    template: './src/index.html',
    title: 'SoundPlace',
    filename: '404.html',
    removeRedundantAttributes: true,
    inject: false,
    manifest: './assets/manifest.json',
    favicon: './assets/img/favicon.ico',
    minify: {
      collapseWhitespace: true,
      removeComments: true,
    },
    themeColor: '#fff', //MY_APP_HERE
  }),
  new ScriptExtHtmlWebpackPlugin({defaultAttribute: 'async'}),
  new HtmlWebpackPlugin({
    template: './src/index.html',
    title: 'SoundPlace',
    filename: 'index.html',
    removeRedundantAttributes: true,
    inject: false,
    manifest: './assets/manifest.json',
    favicon: './assets/img/favicon.ico',
    minify: {
      collapseWhitespace: true,
      removeComments: true,
    },
    themeColor: '#fff', //MY_APP_HERE
  }),
  new ScriptExtHtmlWebpackPlugin({defaultAttribute: 'async'}),
];

export const devServerconfig = {
  devServer: {
    port: process.env.PORT || 9100,
    host: '0.0.0.0',
    hot: true,
    contentBase: './src/index',
    historyApiFallback: true,
  },
};

export const devLoaders = [
  {
    test: /\.(scss|css)$/,
    use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
  },
];
