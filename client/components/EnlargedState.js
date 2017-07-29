import React from 'react';
import {connect} from 'react-redux';
import * as d3 from 'd3';
import * as topojson from 'topojson';

export class EnlargedState extends React.Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        d3.select('.state-enlarged').on('click', function(d, i) {
            console.log('state clicked');
        });
    }
    
    render() {
        return (
            <path
                d={this.props.enlargedState.attributes[0].value}
                className='state-enlarged'
            ></path>
        );
    }
}

const mapStateToProps = state => ({
    usStatesData: state.usStatesData,
    enlargedState: state.enlargedState
});

export default connect(mapStateToProps)(EnlargedState);