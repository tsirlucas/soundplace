import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ManifestPlugin from 'webpack-manifest-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin';

const ENV = process.env.NODE_ENV || 'development';

export const plugins = [
	new webpack.optimize.OccurrenceOrderPlugin(),
	new webpack.LoaderOptionsPlugin({
		options: {
			context: __dirname,
			postcss: [autoprefixer]
		},
		minimize: true,
		debug: false
	}),
	new ExtractTextPlugin({filename: '[name].[chunkhash:5].css', allChunks: true}),
	new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(ENV)}),
	new HtmlWebpackPlugin({
		template: './src/index.html',
		title: 'SoundPlace',
		filename:'200.html',
		removeRedundantAttributes: true,
		inject: false,
		manifest: 'manifest.json',
    favicon: './src/assets/img/favicon.ico',
		minify: {
			collapseWhitespace: true,
			removeComments: true
		},
		themeColor: '#fff' //MY_APP_HERE
	}),
	new HtmlWebpackPlugin({
		template: './src/index.html',
		title: 'SoundPlace',
		removeRedundantAttributes: true,
		inject: false,
		manifest: 'manifest.json',
		minify: {
			collapseWhitespace: true,
			removeComments: true
		},
    themeColor: '#fff' //MY_APP_HERE
	}),
	new ScriptExtHtmlWebpackPlugin({defaultAttribute: "async"}),
	new ManifestPlugin({fileName: 'asset-manifest.json'})
];
