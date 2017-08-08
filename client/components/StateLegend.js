import React from 'react';
import {connect} from 'react-redux';
import * as d3 from 'd3';
import * as d3Chromatic from 'd3-scale-chromatic';
import {legendHelper} from '../helpers/legendHelper.js';

export class StateLegend extends React.Component {
    constructor(props) {
        super(props);
    }
    
    componentDidUpdate() {
        const categoryHelper = legendHelper(this.props.categoryName);
        
        if (this.props.categoryName === null) {
            categoryHelper();
            return;
        } 
        
        const adjustedRange = legendHelper('range-adjust')(
                                    'state', 
                                    this.props.categoryName,
                                    categoryHelper(this.props.categoryStateData)
                                );

        legendHelper('load')(adjustedRange);
    }
    
    render() {
        return (
            <g className="state-legend"> 

            </g>
        );
    }
}

const mapStateToProps = state => ({
    categoryName: state.categoryName,
    categoryStateData: state.categoryStateData,
});

export default connect(mapStateToProps)(StateLegend);
