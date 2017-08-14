import React from 'react';
import { connect } from 'react-redux';
import { legendHelper } from '../../helpers/legendHelper.js';

export class CountyLegend extends React.Component {
    componentDidUpdate() {
        const categoryHelper = legendHelper(this.props.categoryName);
        
        if (this.props.categoryName === null) {
            categoryHelper();
            return;
        } 

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
    color: state.color
});

export default connect(mapStateToProps)(CountyLegend);
