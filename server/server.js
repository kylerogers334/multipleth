const path = require('path');
const express = require('express');

const app = express();
app.use(express.static(__dirname + '/../client/dist'));

const apiRouter = require('./routes/apiRouter');
app.use('/api', apiRouter);

app.get('/', function(req, res) {
    res.sendFile(path.resolve('/index.html'));
});

app.get('/teapot', function(req, res) {
    res.status(418).send();
});

app.listen(process.env.PORT, function() {
    console.log('App running on port', process.env.PORT);
});