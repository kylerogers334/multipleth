const path = require('path');
const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.json({message: 'hello router'});
});

module.exports = router;