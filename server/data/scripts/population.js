const fs = require('fs');

const data = JSON.parse(
	fs.readFileSync('server/data/dataSets/population.json')
);

const countyPopulation = data
	.filter(county => county[1] === '11' && county[7] < 60)
	.map(county => ({
		stateFIPS: county[7],
		state: county[5].split(',')[1].trim(),
		countyFIPS: county[8],
		county: county[5].split(',')[0],
		population: Number(county[4])
	}));

const statePopulation = countyPopulation.reduce(
	(acc, cur) => ({
		...acc,
		...(acc[cur.stateFIPS]
			? {
					[cur.stateFIPS]: {
						...cur,
						population:
							acc[cur.stateFIPS].population + cur.population
					}
			  }
			: { [cur.stateFIPS]: cur })
	}),
	{}
);

const countyPopulationFormatted = countyPopulation.map(county => ({
	fips: county.stateFIPS + county.countyFIPS,
	name: county.county,
	population: county.population
}));
const statePopulationFormatted = Object.keys(statePopulation).map(
	stateFIPS => ({
		fips: stateFIPS,
		name: statePopulation[stateFIPS].state,
		population: statePopulation[stateFIPS].population
	})
);

module.exports = async knex => {
	await knex.schema.dropTableIfExists('population_state');
	await knex.schema.dropTableIfExists('population_county');

	await knex.schema.createTable('population_state', table => {
		table.increments();
		table.text('fips');
		table.text('name');
		table.integer('population');
	});
	await knex.schema.createTable('population_county', table => {
		table.increments();
		table.text('fips');
		table.text('name');
		table.integer('population');
	});

	await knex('population_state').insert(statePopulationFormatted);
	await knex('population_county').insert(countyPopulationFormatted);
};
