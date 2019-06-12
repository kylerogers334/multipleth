const express = require('express');
const router = express.Router();

const knex = require('../../config/config.js').knex;

router.get('/state', (req, res) =>
	knex
		.select('name', 'latino')
		.from('population_state')
		.then(results => res.json(results))
		.catch(err => console.error(err))
);

router.get('/county/:fipsID', (req, res) =>
	knex
		.select('fips', 'latino')
		.from('population_county')
		.where(knex.raw(`SUBSTRING(fips, 1, 2)='${req.params.fipsID}'`))
		.then(results => res.json(results))
		.catch(err => console.error(err))
);

module.exports = router;
