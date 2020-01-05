import * as d3 from 'd3';

import colorSelector from './colorHelpers';
import store from '../store';

export const stateHelper = category => {
	const suh = stateUniversalHelper;

	switch (category) {
		case 'clear':
			return stateClearHelper;
		case 'unemployment':
			return suh('rate');
		case 'population':
			return suh('population');
		case 'income':
			return suh('median_income');
		case 'age':
			return suh('median_age');
		case 'education':
			return suh('percent_bach_degree');
		case 'housing':
			return suh('median_cost');
		case 'rent':
			return suh('median_rent');
		case 'white':
			return suh('white');
		case 'latino':
			return suh('latino');
		case 'black':
			return suh('black');
		case 'asian':
			return suh('asian');
		case 'crime':
			return suh('rate');
		case 'election':
			return stateElectionHelper();
	}
};

const stateClearHelper = () =>
	d3
		.select('#states-container')
		.selectAll('path')
		.transition()
		.duration(750)
		.style('fill', '#FFF');

const stateUniversalHelper = dataKey => categoryStateData => {
	const dataAsObj = categoryStateData.reduce((acc, cur) => ({
		...acc,
		[cur.name]: cur[dataKey]
	}));

	stateDataHelper(dataAsObj);
};

const stateElectionHelper = () => categoryStateData => {
	const dataAsObj = categoryStateData.reduce((acc, cur) => ({
		...acc,
		[state.name]: state['winner']
	}));

	d3.select('#states-container')
		.selectAll('path')
		.transition()
		.duration(750)
		.style('fill', function(d) {
			return dataAsObj[d3.select(this).attr('id')] === 'Donald Trump'
				? '#D22532'
				: '#244999';
		})
		.each(function() {
			// remove previous category data from title
			d3.select(this)
				.select('title')
				.text(d3.select(this).attr('id'));
		});
};

const stateDataHelper = data => {
	const values = Object.values(data).sort((a, b) => a - b);
	const dataMin = d3.quantile(values, 0.15);
	const dataMax = d3.quantile(values, 0.95);
	const steps = (dataMax - dataMin) / 9;
	const color = d3
		.scaleThreshold()
		.domain(d3.range(dataMin, dataMax, steps))
		.range(colorSelector(store.getState().color));

	d3.select('#states-container')
		.selectAll('path')
		.transition()
		.duration(750)
		.style('fill', function(d) {
			return color(data[d3.select(this).attr('id')]);
		})
		.each(function() {
			const stateName = d3.select(this).attr('id');

			d3.select(this)
				.select('title')
				.text(stateName + ' ' + data[stateName]);
		});
};
