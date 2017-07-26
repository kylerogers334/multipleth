import React from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson';
import './Map.css';

export default class Map extends React.Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        this.createMap();
    }
    
    createMap() {
        const svg = d3.select('svg');
        const path = d3.geoPath(); 
        
        // needs to pull from either db, or just serve within html
        d3.json('../../data/us-10m.v1.json', function(error, us) {
            if (error) throw error;

            svg.append('g')
                .attr('class', 'states')
                .selectAll('path')
                .data(topojson.feature(us, us.objects.states).features)
                .enter().append('path')
                .attr('d', path);
            
            svg.append('path')
                .attr('class', 'state-borders')
                .attr('d', path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })));
        });
    }
    
    render() {
        return (
            <div id='map'>
                <svg width="960" height="600"></svg>
            </div>
        );
    }
}