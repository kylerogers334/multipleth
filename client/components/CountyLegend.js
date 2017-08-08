import React from 'react';
import {connect} from 'react-redux';
import * as d3 from 'd3';
import * as d3Chromatic from 'd3-scale-chromatic';
import {legendHelper} from '../helpers/legendHelper.js';

export class CountyLegend extends React.Component {
    constructor(props) {
        super(props);
    }
    
    componentDidUpdate() {
        const categoryHelper = legendHelper(this.props.categoryName);
        
        if (this.props.categoryName === null) {
            categoryHelper();
            return;
        } 
        
        // const that = this; // save access to props inside D3 function

        // const dataValues = categoryHelper(this.props.categoryCountyData);
        // const dataMin = d3.quantile(dataValues, 0.05);
        // const dataMax = d3.quantile(dataValues, 0.95);
        // const steps = (dataMax - dataMin) / 8;
        // const adjustedRange = d3.range(dataMin, dataMax, steps).map(function(i) {
        //     return legendHelper('number-fix')(i, 'county', that.props.categoryName);
        // });

        // legendHelper('load')(adjustedRange);
        
        const adjustedRangeState = legendHelper('range-adjust')(
                                    'state', 
                                    this.props.categoryName,
                                    categoryHelper(this.props.categoryStateData)
                                );
        
        const adjustedRangeCounty = legendHelper('range-adjust')(
                                    'county', 
                                    this.props.categoryName,
                                    categoryHelper(this.props.categoryCountyData)
                                );
                                
        legendHelper('load')(adjustedRangeCounty, this.props.categoryName, 'county');
        legendHelper('load')(adjustedRangeState, this.props.categoryName, 'state');
        
    }
    
    render() {
        return (
            <g className="county-legend"> 

            </g>
        );
    }
    
}

const mapStateToProps = state => ({
    categoryName: state.categoryName,
    categoryStateData: state.categoryStateData,
    categoryCountyData: state.categoryCountyData,
});

export default connect(mapStateToProps)(CountyLegend);
