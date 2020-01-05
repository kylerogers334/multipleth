const knex = require('../../config/config.js').knex;

const seedPopulationData = require('./scripts/population');
const seedElectionData = require('./scripts/election');

(async () => {
	// await seedPopulationData(knex);
	await seedElectionData(knex);

	await knex.destroy();
})();
