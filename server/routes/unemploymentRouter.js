const express = require('express');
const router = express.Router();

const knex = require('../../config.js').knex;

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

router.get('/county', function(req, res) {
    knex
        .select('*')
        .from('unemployment_county')
        .then(results => {
            res.json(results);
        })
        .catch(err => {
            console.error(err);
        });
});

module.exports = router;