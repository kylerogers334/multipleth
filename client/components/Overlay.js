import React from 'react';
import {connect} from 'react-redux';
import * as d3 from 'd3';

import EnlargedState from './EnlargedState.js';
import Legend from './Legend.js';
import {hideOverlay} from '../actions/actionOverlay.js';
import './Overlay.css';

export class Overlay extends React.Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        this.showOverlay();
    }

    showOverlay() {
        d3.select('.state-overlay')
            .attr('height', 600)
            .attr('width', 960)
            .on('click', (d, i) => {
                this.props.dispatch(hideOverlay());
            });
    }
    
    render() {
        return (
            <g id="overlay-container">
                <Legend />
                <rect className="state-overlay"></rect>
                <EnlargedState />
            </g>
        );
    }
}

export default connect()(Overlay);