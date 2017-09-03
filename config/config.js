'use strict';
require('dotenv').config();
exports.knex = require('knex')(
    {
        client: 'pg',
        connection: process.env.DATABASE_URL
    }
);

exports.DATABASE_URL = process.env.DATABASE_URL;
exports.PORT = process.env.PORT;