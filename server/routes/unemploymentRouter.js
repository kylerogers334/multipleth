const express = require('express');
const router = express.Router();

const knex = require('../../config.js').knex;

router.get('/', function(req, res) {
    // respond with state unemployment
    knex
        .select('*')
        .from('unemployment_state')
        .then(results => {
            res.json(results);
        })
        .catch(err => {
            console.error(err);
        });
        
    // res.json({message: 'unemployment'});
});

module.exports = router;