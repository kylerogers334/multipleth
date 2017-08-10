const path = require('path');
const express = require('express');
const router = express.Router();

const unemploymentRouter = require('./unemploymentRouter');
const populationRouter = require('./populationRouter');
const incomeRouter = require('./incomeRouter');
router.use('/population', populationRouter);
router.use('/unemployment', unemploymentRouter);
router.use('/income', incomeRouter);

router.get('/', function(req, res) {
    res.json({message: 'hello router'});
});

module.exports = router;