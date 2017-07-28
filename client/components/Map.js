import React from 'react';
import {connect} from 'react-redux';
import * as d3 from 'd3';
import * as topojson from 'topojson';
import './Map.css';
import Overlay from './Overlay';
import {loadUsStatesData} from '../actions/actionMap.js';

export class Map extends React.Component {
    constructor(props) {
        super(props);
        this.createMap = this.createMap.bind(this);
    }
    
    componentDidMount() {
        this.createMap();
    }
    
    createMap() {
        const svg = d3.select('svg');
        const path = d3.geoPath();
        
        // needs to pull from either db, or just serve within html
        d3.json('./data/us-10m.v1.json', (error, us) => {
            if (error) throw error;

            this.props.dispatch(loadUsStatesData(us));

            svg.append('g')
                .attr('class', 'states')
                .selectAll('path')
                .data(topojson.feature(
                    this.props.usStatesData, 
                    this.props.usStatesData.objects.states)
                .features)
                .enter().append('path')
                .attr('d', path)
                .attr('id', (d, i) => {
                    return this.props.usStatesData
                            .objects.states.geometries[i].info.name;
                })
                .attr('data-index', (d, i) => { return i })
                .on('click', (d, i) => {
                    this.props.showOverlay = true;
                });
        });
    }
    
    render() {
        let overlay;
        if (this.props.showOverlay) {
            overlay = 
            <Overlay 
                USStatesData={this.props.USStatesData}
            />;
        }
        
        return (
            <div id='map'>
                <svg width='960' height='600'>
                    {overlay}
                </svg>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    showOverlay: state.showOverlay,
    usStatesData: state.usStatesData
});

export default connect(mapStateToProps)(Map);