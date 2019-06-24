const path = require('path');
const express = require('express');

const app = express();

if (process.env.NODE_ENV !== 'production') {
	const webpack = require('webpack');
	const webpackConfig = require('../config/webpack.config');
	const compiler = webpack(webpackConfig);

	app.use(
		require('webpack-dev-middleware')(compiler, {
			noInfo: true,
			publicPath: webpackConfig.output.publicPath
		})
	);

	app.use(require('webpack-hot-middleware')(compiler));
}

app.use(express.static(__dirname + '/../client/dist'));

const apiRouter = require('./routes/apiRouter');
app.use('/api', apiRouter);

app.get('/', (req, res) => res.sendFile(path.resolve('/index.html')));

app.get('/teapot', (req, res) => res.status(418).send());

const server = app.listen(process.env.PORT, () =>
	console.log('App running on port', process.env.PORT)
);

module.exports = { app, server };
