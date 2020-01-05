'use strict';
require('dotenv').config();

exports.knex = require('knex')({
	client: 'pg',
	connection: process.env.MULTIPLETH_DATABASE_URL
});

exports.MULTIPLETH_DATABASE_URL = process.env.MULTIPLETH_DATABASE_URL;
exports.MULTIPLETH_DATABASE_PORT = process.env.MULTIPLETH_DATABASE_PORT;
