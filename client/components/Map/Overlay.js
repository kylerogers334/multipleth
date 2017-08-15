import React from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';

import EnlargedState from './EnlargedState.js';
import CountyLegend from '../Legend/CountyLegend.js';
import CloseOverlayButton from './CloseOverlayButton.js';

import './Map.css';

export class Overlay extends React.Component {
    componentDidMount() {
        d3.select('.state-overlay')
            .attr('height', 600)
            .attr('width', 960);
    }

    render() {
        return (
            <g id="overlay-container">
                <CountyLegend />
                <rect className="state-overlay"></rect>
                <EnlargedState />
                <CloseOverlayButton />
            </g>
        );
    }
}

export default connect()(Overlay);