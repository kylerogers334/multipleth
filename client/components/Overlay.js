import React from 'react';
import {connect} from 'react-redux';

import * as d3 from 'd3';
import * as topojson from 'topojson';

import './Overlay.css';

export class Overlay extends React.Component {
    constructor(props) {
        super(props);
    }
    
    showOverlay() {
        const svg = d3.select('svg');
        const path = d3.geoPath();
        
        const selectedState = d3.select(this);
                    
        svg.append('rect')
            .attr('class', 'state-overlay')
            .attr('height', 600)
            .attr('width', 960)
            .attr('z-index', 50)
            .on('click', function(d, i) {
                d3.select('.state-enlarged').remove();
                d3.select(this).remove();
            });
            
        console.log(selectedState.attr('id'));
        svg.append('path')
            .datum(topojson.feature(
                this.props.USStatesData, 
                this.props.USStatesData.objects.states
                    .geometries[selectedState.attr('data-index')])
            )
            .attr('class', 'state-enlarged')
            .attr('d', path)
            .attr('z-index', 100)
            .on('click', function(d, i) {
                d3.select('.state-overlay').remove();
                d3.select(this).remove();
            });
    }
    
    render() {
        return (
            <g className="states">
                {this.showOverlay()}
            </g>
        );
    }
}

const mapStateToProps = state => ({
    enlargedState: state.enlargedState,
    USStatesData: state.USStatesData,
});

export default connect(mapStateToProps)(Overlay);