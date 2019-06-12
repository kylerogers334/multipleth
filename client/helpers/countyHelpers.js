import * as d3 from 'd3';
import * as topojson from 'topojson';

import dimensionFix from './dimensionFix.js';
import colorSelector from './colorHelpers';
import store from '../store';

export const countyHelper = category => {
	const cuh = countyUniversalHelper;
	switch (category) {
		case 'clear':
			return countyClearHelper;
		case 'blankLoad':
			return blankCountyLoadHelper;
		case 'unemployment':
			return cuh('rate');
		case 'population':
			return cuh('population');
		case 'income':
			return cuh('median_income');
		case 'age':
			return cuh('median_age');
		case 'education':
			return cuh('percent_bach_degree');
		case 'housing':
			return cuh('median_cost');
		case 'rent':
			return cuh('median_rent');
		case 'white':
			return cuh('white');
		case 'latino':
			return cuh('latino');
		case 'black':
			return cuh('black');
		case 'asian':
			return cuh('asian');
		case 'crime':
			return cuh('rate');
		case 'election':
			return countyElectionHelper();
	}
};

const countyClearHelper = () =>
	d3
		.select('#overlay-container')
		.selectAll('path')
		.transition()
		.duration(750)
		.style('fill', 'white');

const countyElectionHelper = () => categoryCountyData => {
	const dataAsObj = categoryCountyData.reduce(
		(acc, cur) => ({ ...acc, [cur.fips]: cur['winner'] }),
		{}
	);

	setTimeout(() => {
		d3.select('#overlay-container')
			.selectAll('path')
			.transition()
			.duration(750)
			.style('fill', () => {
				const match = dataAsObj[this.attributes[2].value];

				return !match
					? '#FFF'
					: match === 'Donald Trump'
					? '#D22532'
					: '#244999';
			})
			.each(function() {
				d3.select(this)
					.select('title')
					.text(d3.select(this).attr('id'));
			});
	}, 150);
};

const blankCountyLoadHelper = () => {
	const state = d3.select('.state-enlarged');
	const stateId = dimensionFix[state.attr('id')];

	const dimensions = state.node().getBBox();
	const baseScale =
		dimensions.x > dimensions.y
			? Math.floor(600 / dimensions.height)
			: Math.floor(960 / dimensions.width);
	const scale = baseScale + stateId.scale;

	const tX = -scale * dimensions.x + 100 + stateId.x;
	const tY = -scale * dimensions.y + 100 + stateId.y;

	state
		.attr('transform', `translate(${tX}, ${tY}) scale(${scale}, ${scale})`)
		.attr('stroke-width', `${1 / (scale * 2)}`);

	d3.json('./us-10m.v1.json', (error, us) => {
		// extracting data-FIPS-num attribute with correct format
		const fipsStateCode = this.props.enlargedState.attributes[2].value;
		// adds a 0 to one digit state codes, FIPS standard requires double digit
		// state codes
		const fipsNum =
			fipsStateCode.length === 1 ? '0' + fipsStateCode : fipsStateCode;
		const counties = us.objects.counties.geometries;

		us.objects.counties.geometries = counties.filter(
			c => c.info.id.slice(0, 2) === fipsNum
		);

		d3.select('#overlay-container')
			.selectAll('path')
			.data(topojson.feature(us, us.objects.counties).features)
			.enter()
			.append('path')
			.attr('class', 'county')
			.attr('id', (d, i) => us.objects.counties.geometries[i].info.name)
			.attr(
				'data-FIPS-num',
				(d, i) => us.objects.counties.geometries[i].info.id
			)
			.attr('d', d3.geoPath())
			.attr(
				'transform',
				`translate(${tX}, ${tY}) scale(${scale}, ${scale})`
			)
			.attr('stroke-width', `${1 / (scale * 2)}`)
			.on('mouseover', function() {
				d3.select(this).style('fill-opacity', 0.8);
			})
			.on('mouseout', function() {
				d3.select(this).style('fill-opacity', 1);
			})

			// Add info on mouseover
			.append('title')
			.text(function(d) {
				return d3.select(this.parentNode).attr('id');
			});
	});
};

const countyDataHelper(data) => {
	const values = Object.values(data).sort((a, b) => a - b);
	const dataMin = d3.quantile(values, 0.05);
	const dataMax = d3.quantile(values, 0.95);
	const steps = (dataMax - dataMin) / 9;
	const color = d3
		.scaleThreshold()
		.domain(d3.range(dataMin, dataMax, steps))
		.range(colorSelector(store.getState().color));

	// Timeout prevents bug where reducer changing the categoryCountyData
	// (data received from database) before D3 can draw every county line.
	// If that were to happen, D3 would find no path elements to select and
	// will not update the color.

	setTimeout(() => {
		d3.select('#overlay-container')
			.selectAll('path')
			.transition()
			.duration(750)
			.style('fill', function() {
				const match = data[this.attributes[2].value];

				return match ? '#FFF' : color(match);
			})
			.each(function() {
				const _this = d3.select(this);
				const stateName = _this.attr('id');
				const fips = _this.attr('data-FIPS-num');
				_this.select('title').text(stateName + ' ' + data[fips]);
			});
	}, 150);
}

const countyUniversalHelper = dataKey => categoryCountyData => {
	const dataAsObj = categoryCountyData.reduce(
		(acc, cur) => ({ ...acc, [cur.fips]: cur[dataKey] }),
		{}
	);

	countyDataHelper(dataAsObj);
};
