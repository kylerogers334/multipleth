import React from 'react';
import {connect} from 'react-redux';
import * as d3 from 'd3';
import * as topojson from 'topojson';

export class EnlargedState extends React.Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        const state = d3.select('.state-enlarged');

        const dimensions = state.node().getBBox();
        const xCenter = dimensions.x + (dimensions.x / 2);
        const yCenter = dimensions.y + (dimensions.y / 2);
        const scale = (dimensions.x > dimensions.y) ?
            Math.floor(600 / dimensions.height) :
            Math.floor(960 / dimensions.width);
        console.log(dimensions);
        console.log(xCenter, yCenter);
        
        // parent center is 480x 300y
        const xdiff = 480 - xCenter;
        const ydiff = 300 - yCenter;
        console.log(xdiff, ydiff)
        state.attr('transform', `translate(${-100}, ${0}) scale(${scale}, ${scale})`)
        // state.attr('transform', `translate(${100}, ${100})`)
        // state.attr('transform', `translate(${-250}, ${-50}) scale(${scale}, ${scale})`);
        // state.attr('transform', 'scale(6, 6)')
    }
    
    render() {
        return (
            <path
                d={this.props.enlargedState.attributes[0].value}
                className='state-enlarged'
                id={this.props.enlargedState.id}
            ></path>
        );
    }
}

const mapStateToProps = state => ({
    usStatesData: state.usStatesData,
    enlargedState: state.enlargedState
});

export default connect(mapStateToProps)(EnlargedState);