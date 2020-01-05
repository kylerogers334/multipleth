const fs = require('fs');
const { Client } = require('pg');

const age = fs.readFileSync('server/data/sqlScripts/age.sql').toString();
const crime = fs.readFileSync('server/data/sqlScripts/crime.sql').toString();
const education = fs.readFileSync('server/data/sqlScripts/education.sql').toString();
const election = fs.readFileSync('server/data/sqlScripts/election.sql').toString();
const housing = fs.readFileSync('server/data/sqlScripts/housing.sql').toString();
const income = fs.readFileSync('server/data/sqlScripts/income.sql').toString();
const population = fs.readFileSync('server/data/sqlScripts/population.sql').toString();
const unemployment = fs.readFileSync('server/data/sqlScripts/unemployment.sql').toString();

(async () => {
	const client = new Client({
		user: 'kyle',
		host: 'localhost',
		port: 5432
	});

	await client.connect();

	await client.query(age);
	await client.query(crime);
	await client.query(education);
	await client.query(election);
	await client.query(housing);
	await client.query(income);
	await client.query(population);
	await client.query(unemployment);

	await client.end();
})();
