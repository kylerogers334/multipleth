import React from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';

import EnlargedState from './EnlargedState.js';
import CountyLegend from '../Legend/CountyLegend.js';
import { hideOverlay } from '../../actions/actionOverlay.js';

export class Overlay extends React.Component {
    componentDidMount() {
        d3.select('.state-overlay')
            .attr('height', 600)
            .attr('width', 960)
            .on('click', (d, i) => {
                this.props.dispatch(hideOverlay());
            });
    }

    render() {
        return (
            <g id="overlay-container" fill="white">
                <CountyLegend />
                <rect className="state-overlay"></rect>
                <EnlargedState />
            </g>
        );
    }
}

export default connect()(Overlay);