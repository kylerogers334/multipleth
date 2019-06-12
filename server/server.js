const path = require('path');
const express = require('express');

const app = express();
app.use(express.static(__dirname + '/../client/dist'));

const apiRouter = require('./routes/apiRouter');
app.use('/api', apiRouter);

app.get('/', (req, res) => res.sendFile(path.resolve('/index.html')));

app.get('/teapot', (req, res) => res.status(418).send());

const server = app.listen(process.env.PORT, () =>
	console.log('App running on port', process.env.PORT)
);

module.exports = { app, server };
