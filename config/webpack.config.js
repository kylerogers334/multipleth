const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: './client/index.js',
	output: {
		path: path.resolve(__dirname, '../client/dist'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			}
		]
	},
	stats: {
		colors: true
	},
	devtool: 'source-map'
};
