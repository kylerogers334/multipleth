import * as d3 from 'd3';

import colorSelector from './colorHelpers';
import store from '../store.js';

export const legendHelper = category => {
	const luh = legendUniversalHelper;

	switch (category) {
		case null:
			return legendClearHelper;
		case 'unemployment':
			return luh('rate');
		case 'population':
			return luh('population');
		case 'income':
			return luh('median_income');
		case 'age':
			return luh('median_age');
		case 'education':
			return luh('percent_bach_degree');
		case 'housing':
			return luh('median_cost');
		case 'rent':
			return luh('median_rent');
		case 'white':
			return luh('white');
		case 'latino':
			return luh('latino');
		case 'black':
			return luh('black');
		case 'asian':
			return luh('asian');
		case 'crime':
			return luh('rate');
		case 'election':
			return legendElectionHelper;
		case 'load':
			return legendLoadHelper;
		case 'number-fix':
			return legendNumberFixerHelper;
		case 'range-adjust':
			return legendRangeAdjustHelper;
	}
};

const legendClearHelper = () => {
	// replaces legend with an empty <g>
	d3.select('.state-legend').remove();
	d3.select('.county-legend').remove();

	d3.select('#states-container')
		.append('g')
		.attr('class', 'state-legend');

	d3.select('#overlay-container')
		.append('g')
		.attr('class', 'county-legend');
};

const legendRangeAdjustHelper = (currentView, categoryName, data) => {
	const dataMin = d3.quantile(data, 0.05);
	const dataMax = d3.quantile(data, 0.95);
	const steps = (dataMax - dataMin) / 8;

	return d3
		.range(dataMin, dataMax, steps)
		.map(i => legendHelper('number-fix')(i, currentView, categoryName));
};

const legendUniversalHelper = dataKey => categoryData =>
	categoryData.map(d => d[dataKey]).sort((a, b) => a - b);

const legendElectionHelper = currentView => {
	const g = legendDOMSelectionHelper(currentView);

	g.attr('transform', 'translate(0, 40)').raise();

	g.selectAll('rect')
		.data([0, 1])
		.enter()
		.append('rect')
		.attr('x', (d, i) => 580 + 100 * i)
		.attr('width', 20)
		.attr('height', 20)
		.attr('fill', (d, i) => (i === 0 ? '#244999' : '#D22532'));

	g.append('text')
		.attr('x', 608)
		.attr('y', 14)
		.text('Clinton');

	g.append('text')
		.attr('x', 708)
		.attr('y', 14)
		.text('Trump');

	g.append('text')
		.attr('class', () =>
			currentView === 'county'
				? 'county-legend-title'
				: 'state-legend-title'
		)
		.attr('x', 600)
		.attr('y', -6)
		.text(legendTextHelper('election'));

	g.selectAll('text')
		.attr('fill', '#000')
		.attr('text-anchor', 'start')
		.attr('font-size', '11px')
		.attr('font-family', 'Roboto Slab, serif')
		.attr('letter-spacing', '0.5px');
};

const legendLoadHelper = (adjustedRange, category, currentView) => {
	const g = legendDOMSelectionHelper(currentView);

	g.attr('transform', 'translate(0,40)').raise();

	const selectedColor = colorSelector(store.getState().color);

	const color = d3
		.scaleThreshold()
		.domain(adjustedRange)
		.range(selectedColor);

	const xPosition = d3
		.scaleLinear()
		.domain([0, 9])
		.rangeRound([541, 864]);

	g.selectAll('rect')
		.data(color.range())
		.enter()
		.append('rect')
		.attr('height', 8)
		.attr('x', (d, i) => xPosition(i))
		.attr('width', 37)
		.attr('fill', (d, i) => selectedColor[i])
		.on('mouseover', function() {
			d3.select(this).style('fill-opacity', 0.8);
		})
		.on('mouseout', function() {
			d3.select(this).style('fill-opacity', 1);
		});

	// Fixes an issue with text not being changed
	d3.selectAll('.state-legend-title').remove();
	if (currentView === 'county') {
		d3.selectAll('.county-legend-title').remove();
	}

	g.append('text')
		.attr('class', () =>
			currentView === 'county'
				? 'county-legend-title'
				: 'state-legend-title'
		)
		.attr('x', 541)
		.attr('y', -6)
		.attr('fill', '#000')
		.attr('text-anchor', 'start')
		.attr('font-size', '11px')
		.attr('font-family', 'Roboto Slab, serif')
		.attr('letter-spacing', '0.5px')
		.text(legendTextHelper(category));

	// shiftedRange moves tick location to the right by 1.
	const shiftedRange = [null, ...adjustedRange];
	g.call(
		d3
			.axisBottom(xPosition)
			.tickSize(15)
			.tickFormat((d, i) => (shiftedRange[i] ? shiftedRange[i] : ''))
	)
		.select('.domain')
		.remove();

	// hide the ticks on both ends
	d3.select('.state-legend')
		.selectAll('g')
		.attr('opacity', (d, i) => (i === 0 || i === 9 ? 0 : 1));

	d3.select('.county-legend')
		.selectAll('g')
		.attr('opacity', (d, i) => (i === 0 || i === 9 ? 0 : 1));
};

const legendDOMSelectionHelper = currentView => {
	// Fixes all issues with legend re-renders.
	if (currentView === 'county') {
		d3.select('.county-legend').remove();
		d3.select('#overlay-container')
			.append('g')
			.attr('class', 'county-legend');

		return d3.select('.county-legend');
	} else {
		d3.select('.state-legend').remove();
		d3.select('#states-container')
			.append('g')
			.attr('class', 'state-legend');

		return d3.select('.state-legend');
	}
};

const legendNumberFixerHelper = (n, currentView, category) => {
	const format = d3.formatPrefix;

	switch (currentView) {
		case 'state': {
			switch (category) {
				case 'population':
					return format('.1', 1e6)(n);
				case 'income':
					return format('2.0', 1e4)(n);
				case 'age':
					return format('2.0', 1e1)(n);
				case 'education':
					return format('2.0', 1e1)(n);
				case 'housing':
					return format('.0', 1e4)(n);
				default:
					return format('.0', 1e1)(n);
			}
		}

		case 'county': {
			switch (category) {
				case 'population':
					return format('.0', 1e5)(n);
				case 'income':
					return format('2.0', 1e4)(n);
				case 'age':
					return format('2.0', 1e1)(n);
				case 'education':
					return format('2.0', 1e1)(n);
				case 'housing':
					return format('.0', 1e4)(n);
				default:
					return format('.0', 1e1)(n);
			}
		}
	}
};

const legendTextHelper = category => {
	switch (category) {
		case 'unemployment':
			return 'Unemployment Rate';
		case 'population':
			return 'Total Population';
		case 'income':
			return 'Median Income';
		case 'age':
			return 'Median Age';
		case 'education':
			return "% of Population w/ Bachelor's degrees or higher";
		case 'housing':
			return 'Median Housing Cost';
		case 'rent':
			return 'Median Rent';
		case 'white':
			return '% of Population is White';
		case 'latino':
			return '% of Population is Latino';
		case 'black':
			return '% of Population is Black';
		case 'asian':
			return '% of Population is Asian';
		case 'crime':
			return 'Violent Crimes per 100,000 People per Year';
		case 'election':
			return '2016 Election Results';
		default:
			break;
	}
};
