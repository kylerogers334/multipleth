const express = require('express');
const router = express.Router();

const unemploymentRouter = require('./unemploymentRouter');
const populationRouter = require('./populationRouter');
const incomeRouter = require('./incomeRouter');
const ageRouter = require('./ageRouter');
const educationRouter = require('./educationRouter');
const housingRouter = require('./housingRouter');
const rentRouter = require('./rentRouter');
const whiteRouter = require('./whiteRouter');
const latinoRouter = require('./latinoRouter');
const blackRouter = require('./blackRouter');
const asianRouter = require('./asianRouter');
const crimeRouter = require('./crimeRouter');
const electionRouter = require('./electionRouter');

router.use('/population', populationRouter);
router.use('/unemployment', unemploymentRouter);
router.use('/income', incomeRouter);
router.use('/age', ageRouter);
router.use('/education', educationRouter);
router.use('/housing', housingRouter);
router.use('/rent', rentRouter);
router.use('/white', whiteRouter);
router.use('/latino', latinoRouter);
router.use('/black', blackRouter);
router.use('/asian', asianRouter);
router.use('/crime', crimeRouter);
router.use('/election', electionRouter);

module.exports = router;
