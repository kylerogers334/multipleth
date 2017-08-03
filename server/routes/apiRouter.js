const path = require('path');
const express = require('express');
const router = express.Router();

const unemploymentRouter = require('./unemploymentRouter');
const populationRouter = require('./populationRouter');
router.use('/population', populationRouter);
router.use('/unemployment', unemploymentRouter);

router.get('/', function(req, res) {
    res.json({message: 'hello router'});
});

module.exports = router;