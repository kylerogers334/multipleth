import React from 'react';
import {connect} from 'react-redux';
import * as d3 from 'd3';
import * as topojson from 'topojson';

import {stateHelper} from '../helpers/stateHelpers.js';

import './Map.css';
import Overlay from './Overlay';
import StateLegend from './StateLegend';
import {loadUsStatesData} from '../actions/actionHandleData.js';
import {showOverlay} from '../actions/actionOverlay.js';

export class Map extends React.Component {
    componentDidUpdate() {
        if (this.props.categoryStateData) {
            stateHelper(this.props.categoryName)(this.props.categoryStateData);
        } else if (this.props.categoryStateData === null) {
            stateHelper('clear')();
        }
    }
    
    createMap() {
        d3.json('./us-10m.v1.json', (error, us) => {
            if (error) throw error;
            // React and D3 use this differently. reactThis saves the class this.
            // Normal this is used as the D3 this.
            let reactThis = this;
            const d3StatesData = d3.select('#states-container')
                .attr('class', 'states')
                .selectAll('path')
                .data(topojson.feature(us, us.objects.states).features)
                .enter().append('path')
                .attr('d', d3.geoPath())
                .attr('id', (d, i) => {
                    return us.objects.states.geometries[i].info.name;
                })
                .attr('data-FIPS-number', (d, i) => {
                    return us.objects.states.geometries[i].info.id;
                })
                .on('click', function(d, i) {
                    // non arrow function used to not call with React context, 
                    // but instead use D3 context
                    reactThis.props.dispatch(showOverlay(this));
                });
                
            this.props.dispatch(loadUsStatesData(d3StatesData));
        });
    }
    
    render() {
        // Initial load.
        if (!this.props.usStatesData) this.createMap();
        
        let overlay;
        if (this.props.displayOverlay) overlay = <Overlay />;
        
        return (
            <div id='map'>
                <svg width='960' height='650' id='svg-container'>
                    <g id="states-container">
                        <StateLegend />
                    </g>
                    {overlay}
                </svg>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    displayOverlay: state.displayOverlay,
    usStatesLineData: state.usStatesLineData,
    categoryStateData: state.categoryStateData,
    categoryName: state.categoryName,
    color: state.color
});

export default connect(mapStateToProps)(Map);