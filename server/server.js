const path = require('path');
const express = require('express');

const app = express();
app.use(express.static(__dirname + '/../'));

app.get('/', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../client/index.html'));
});

app.listen(process.env.PORT, function() {
    console.log('App running on port', process.env.PORT);
});