import React from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';

import EnlargedState from './EnlargedState';
import CountyLegend from '../Legend/CountyLegend';
import CloseOverlayButton from './CloseOverlayButton';

import './Map.css';

export const Overlay = () => (
	<g id="overlay-container">
		<CountyLegend />
		<rect className="state-overlay" style={{ height: 600, width: 960 }} />
		<EnlargedState />
		<CloseOverlayButton />
	</g>
);

export default connect()(Overlay);
