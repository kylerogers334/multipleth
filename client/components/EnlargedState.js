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
        const scale = (dimensions.x > dimensions.y) ?
            Math.floor(600 / dimensions.height) :
            Math.floor(960 / dimensions.width);
        // console.log(dimensions);
        // console.log('scale', scale)
        const tX = (-scale) * dimensions.x + 50;
        const tY = (-scale) * dimensions.y + 50;
        state.attr('transform', `translate(${tX}, ${tY}) scale(${scale}, ${scale})`);
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