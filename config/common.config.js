import webpack from 'webpack';
import ManifestPlugin from 'webpack-manifest-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import Dotenv from 'dotenv-webpack';

const ENV = process.env.NODE_ENV || 'development';

export const plugins = [
  new Dotenv({systemvars: true}),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new ExtractTextPlugin({filename: 'style.css', allChunks: true}),
  new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(ENV)}),
  new ManifestPlugin({fileName: 'asset-manifest.json'}),
];
