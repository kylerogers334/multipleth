const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: ['webpack-hot-middleware/client', './client/index.js'],
	output: {
		path: path.resolve(__dirname, '../client/dist'),
		filename: 'bundle.js'
	},
	mode: JSON.stringify(process.env.NODE_ENV) || 'development',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loaders: ['babel-loader']
			}
		]
	},
	devServer: {
		contentBase: './client',
		hot: true
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
		}),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
	],
	stats: {
		colors: true
	},
	devtool: 'source-map'
};
