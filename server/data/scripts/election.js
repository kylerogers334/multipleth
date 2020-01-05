const fs = require('fs');

const stateData = JSON.parse(
	fs.readFileSync('server/data/dataSets/election/state.json')
);
const countyData = JSON.parse(
	fs.readFileSync('server/data/dataSets/election/county.json')
);

module.exports = async knex => {
	await knex.schema.dropTableIfExists('election_state');
	await knex.schema.dropTableIfExists('election_county');

	await knex.schema.createTable('election_state', table => {
		table.increments();
		table.text('state');
		table.float('percentage');
		table.text('winner');
	});
	await knex.schema.createTable('election_county', table => {
		table.increments();
		table.text('fips');
		table.float('percentage');
		table.text('winner');
	});

	await knex('election_state').insert(stateData);
	await knex('election_county').insert(countyData);
};
