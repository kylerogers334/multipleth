const express = require('express');
const router = express.Router();

const knex = require('../../config/config.js').knex;

router.get('/state', function(req, res) {
    knex
        .select('*')
        .from('unemployment_state')
        .then(results => {
            res.json(results);
        })
        .catch(err => {
            console.error(err);
        });
});

router.get('/county/:fipsID', function(req, res) {
    knex
        .select('*')
        .from('unemployment_county')
        .where(knex.raw(`SUBSTRING(fips, 1, 2)='${req.params.fipsID}'`))
        .then(results => {
            res.json(results);
        })
        .catch(err => {
            console.error(err);
        });
});

module.exports = router;