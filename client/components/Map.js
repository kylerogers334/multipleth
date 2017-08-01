import React from 'react';
import {connect} from 'react-redux';
import * as d3 from 'd3';
import * as d3Chromatic from 'd3-scale-chromatic';
import * as topojson from 'topojson';

import './Map.css';
import Overlay from './Overlay';
import {loadUsStatesData} from '../actions/actionMap.js';
import {showOverlay} from '../actions/actionOverlay.js';

export class Map extends React.Component {
    constructor(props) {
        super(props);
        this.createMap = this.createMap.bind(this);
    }
    
    componentDidUpdate() {
        // might have to set categoryData to null before every change
        // console.log('d3', d3);
        // console.log('CHROMATIC', d3Chromatic);
        if (this.props.categoryData) {
            const reactThis = this;
            console.log(d3Chromatic.schemeBlues)
            const color = d3.scaleThreshold()
                        .domain(d3.range(2, 100))
                        .range(d3Chromatic.schemeBlues[9]);
            
            d3.select('#states-container').selectAll('path')
                .style('fill', function(d, i) {
                    const state = d3.select(this).attr('id');
                    const match = reactThis.props.categoryData
                                .find(function(d) {if (d.name === state) return d;});
                    // console.log(match.id);
                    return color(match.rate)
                });
        } return true;
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
                .attr('data-index', (d, i) => { return i })
                .on('click', function(d, i) {
                    // non arrow function used to not save React context 
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
                <svg width='960' height='800'>
                    <g id="states-container"></g>
                    {overlay}
                </svg>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    displayOverlay: state.displayOverlay,
    usStatesData: state.usStatesData,
    categoryData: state.categoryData
});

export default connect(mapStateToProps)(Map);