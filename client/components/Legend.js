import React from 'react';
import {connect} from 'react-redux';
import * as d3 from 'd3';
import * as d3Chromatic from 'd3-scale-chromatic';

export class Legend extends React.Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        
        const g = d3.select('.legend')
            .attr('class', 'legend')
            .attr("transform", "translate(0,40)");

        const x = d3.scaleLinear()
            .domain([1, 10])
            .rangeRound([600, 860]);
        // console.log(x)
        // console.log(x.domain())
        // console.log(x.domain()[0])
        
        const color = d3.scaleThreshold()
            .domain(d3.range(2, 10))
            .range(d3Chromatic.schemeBlues[9]);
            
        g.selectAll('rect')
            .data(color.range().map(function(d) {
                // console.log(d);
                d = color.invertExtent(d);
                // console.log(d);
                // I can possibly replace these with [1, 10]
                if (d[0] === undefined) d[0] = x.domain()[0];
                if (d[1] === undefined) d[1] = x.domain()[0];
                return d;
            }))
            .enter().append('rect')
                .attr('height', 8)
                .attr('x', function(d) { return x(d[0]); })
                .attr('width', function(d) { return x(d[1]) - x(d[0]); })
                .attr('fill', function(d) { return color(d[0])});
                
        g.append('text')
            .attr('class', 'legend-title')
            .attr('x', x.range()[0]) // 600
            .attr('y', -6)
            .attr('fill', '#000')
            .attr('text-anchor', 'start')
            .attr('font-weight', 'bold')
            .text('Unemployment rate');
        
        g.call(d3.axisBottom(x)
            .tickSize(15)
            // if i === 0 then x%
            .tickFormat(function(x, i) { return i ? x : x + '%'; })
            .tickValues(color.domain()))
        .select('.domain')
            .remove();
    }
    
    render() {
        return (
            <g className="legend"> 

            </g>
        );
    }
}

const mapStateToProps = state => ({
    categoryName: state.categoryName
});

export default connect(mapStateToProps)(Legend);