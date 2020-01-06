import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import * as d3 from 'd3';
import * as topojson from 'topojson';

import { stateHelper } from '../../helpers/stateHelpers';
import {
	loadUsStatesData,
	fetchCategoryState
} from '../../actions/actionHandleData';
import { showOverlay } from '../../actions/actionOverlay';

import Overlay from './Overlay';
import StateLegend from '../Legend/StateLegend';

const Container = styled.div({
	display: 'flex'
});

const SvgContainer = styled.svg({
	height: 650,
	margin: '32px auto',
	width: 960
});

export class Map extends React.Component {
	componentDidUpdate() {
		if (this.props.categoryStateData) {
			stateHelper(this.props.categoryName)(this.props.categoryStateData);
		} else if (this.props.categoryStateData === null) {
			stateHelper('clear')();
		}
	}

	createMap() {
		d3.json('./us-10m.v1.json').then(topologyData => {
			// React and D3 use 'this' differently. reactThis saves the class scope.
			// Normal this is used as the D3 scope.
			const reactThis = this;

			const d3StatesData = d3
				.select('#states-container')
				.selectAll('path')
				.data(
					topojson.feature(topologyData, topologyData.objects.states)
						.features
				)
				.enter()
				.append('path')
				.attr('d', d3.geoPath())
				.attr(
					'id',
					(d, i) =>
						topologyData.objects.states.geometries[i].info.name
				)
				.attr(
					'data-FIPS-number',
					(d, i) => topologyData.objects.states.geometries[i].info.id
				)
				.on('mouseover', function() {
					// non arrow function used to not call with React context,
					// but instead use D3 context
					d3.select(this).style('fill-opacity', 0.8);
				})
				.on('mouseout', function() {
					d3.select(this).style('fill-opacity', 1);
				})
				.on('click', function() {
					reactThis.props.dispatch(showOverlay(this));
				})
				.append('title')
				.text(function() {
					return d3.select(this.parentNode).attr('id');
				});

			this.props.dispatch(loadUsStatesData(d3StatesData));

			// show unemployment map on load
			// conditional to prevent loop of dispatching
			if (!this.props.categoryStateData && !window.__MAP_LOADED__) {
				window.__MAP_LOADED__ = true; // prevent Clear Map from loading unemployment
				this.props.dispatch(fetchCategoryState('population'));
			}
		});
	}

	render() {
		if (!this.props.usStatesData) {
			this.createMap();
		}

		return (
			<Container>
				<SvgContainer>
					<g id="states-container">
						<StateLegend />
					</g>
					{this.props.displayOverlay ? <Overlay /> : null}
				</SvgContainer>
			</Container>
		);
	}
}

const mapStateToProps = state => ({
	color: state.color,
	categoryName: state.categoryName,
	categoryStateData: state.categoryStateData,
	displayOverlay: state.displayOverlay,
	usStatesLineData: state.usStatesLineData
});

export default connect(mapStateToProps)(Map);
