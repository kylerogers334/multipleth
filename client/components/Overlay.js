import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';

import * as d3 from 'd3';
import * as topojson from 'topojson';

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
        const path = d3.geoPath();
        const enlargedStateName = this.props.enlargedState.id;
        const selectedState = d3.select(`#${enlargedStateName}`);
        console.log('selectedState: ', selectedState);
        
        d3.select('.state-overlay')
            .attr('height', 600)
            .attr('width', 960)
            .on('click', (d, i) => {
                this.props.dispatch(hideOverlay());
            });
            
  
        // console.log(selectedState.attr('id'));
        // this.props.usStatesData.append('path')
        //     .datum(topojson.feature(
        //         this.props.usStatesData, 
        //         this.props.usStatesData.objects.states
        //             .geometries[selectedState.attr('data-index')])
        //     )
        //     .attr('class', 'state-enlarged')
        //     .attr('d', path)
        //     .attr('z-index', 100)
        //     .on('click', function(d, i) {
        //         console.log('state clicked');
        //         d3.select(this).remove();
        //     });
    }
    
    render() {
        return (
            <rect className="state-overlay"></rect>
        );
    }
}

const mapStateToProps = state => ({
    displayOverlay: state.displayOverlay,
    enlargedState: state.enlargedState,
    usStatesData: state.usStatesData,
});

export default connect(mapStateToProps)(Overlay);