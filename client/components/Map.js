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
        d3.json('./data/us-10m.v1.json', function(error, us) {
            if (error) throw error;
            
            svg.append('g')
                .attr('class', 'states')
                .selectAll('path')
                .data(topojson.feature(us, us.objects.states).features)
                .enter().append('path')
                .attr('d', path)
                .attr('id', function(d, i) {
                    return us.objects.states.geometries[i].info.name;
                })
                .on('click', function(d, i) {
                    const selectedState = d3.select(this);
                    
                    svg.append('rect')
                        .attr('class', 'state-overlay')
                        .attr('height', 600)
                        .attr('width', 960)
                        .attr('z-index', 50)
                        .on('click', function(d, i) {
                            d3.select('.state-enlarged').remove();
                            d3.select(this).remove();
                        });
                        
                    console.log(selectedState.attr('id'));
                    svg.append('path')
                        .datum(topojson.feature(us, us.objects.states.geometries[i]))
                        .attr('class', 'state-enlarged')
                        .attr('d', path)
                        .attr('z-index', 100)
                        .on('click', function(d, i) {
                            d3.select('.state-overlay').remove();
                            d3.select(this).remove();
                        })
                });
        });
    }
    
    render() {
        return (
            <div id='map'>
                <svg width='960' height='600'></svg>
            </div>
        );
    }
}