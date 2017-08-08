// import React from 'react';
// import {connect} from 'react-redux';
// import * as d3 from 'd3';
// import * as d3Chromatic from 'd3-scale-chromatic';
// import {legendHelper} from '../helpers/legendHelper.js';

// export class Legend extends React.Component {
//     constructor(props) {
//         super(props);
//     }
    
//     componentDidUpdate() {
//         const categoryHelper = legendHelper(this.props.categoryName);
        
//         let currentView, currentData; // passed to determine which helper to use
//         if (this.props.categoryCountyData) {
//             currentView = 'county';
//             currentData = this.props.categoryCountyData;
//         } else {
//             currentView = 'state';
//             currentData = this.props.categoryStateData;
//         }
        
//         if (this.props.categoryName === null) {
//             categoryHelper();
//             return;
//         } 
        
        

//         // call saves access to props
//         const adjustedRange = legendHelper('range-adjust', categoryHelper(currentData))
//                                 .call(this);
//         // const dataMin = d3.quantile(dataValues, 0.05);
//         // const dataMax = d3.quantile(dataValues, 0.95);
//         // const steps = (dataMax - dataMin) / 8;
//         // const adjustedRange = d3.range(dataMin, dataMax, steps).map(function(i) {
//         //     return legendHelper('number-fix')(i, currentView, that.props.categoryName);
//         // });

//         legendHelper('load')(adjustedRange);
//     }
    
//     render() {
//         return (
//             <g className="legend"> 

//             </g>
//         );
//     }
// }

// const mapStateToProps = state => ({
//     categoryName: state.categoryName,
//     categoryStateData: state.categoryStateData,
//     categoryCountyData: state.categoryCountyData,
// });

// export default connect(mapStateToProps)(Legend);