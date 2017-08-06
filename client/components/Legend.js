import React from 'react';
import {connect} from 'react-redux';
import * as d3 from 'd3';
import * as d3Chromatic from 'd3-scale-chromatic';

export class Legend extends React.Component {
    constructor(props) {
        super(props);
    }
    
    componentDidUpdate() {
        
        const dataValues = [].sort((a, b) => a - b);
        this.props.categoryStateData.forEach(s => {
            dataValues.push(s.rate);
        });

        const dataMin = d3.quantile(dataValues, 0.05);
        const dataMax = d3.quantile(dataValues, 0.95);
        const steps = (dataMax - dataMin) / 8;
        // console.log(dataMin, dataMax, steps);
        const fixedRange = d3.range(dataMin, dataMax, steps).map(function(i) {
            return Number(i.toFixed(1));
        });
        // console.log(fixedRange)
        const g = d3.select('.legend')
            .attr('class', 'legend')
            .attr('transform', 'translate(0,40)');
        
        const x = d3.scaleLinear()
            .domain(fixedRange)
            .rangeRound([600, 860]);
            
        console.log(x.domain());
        
        const color = d3.scaleThreshold()
            .domain(fixedRange)
            .range(d3Chromatic.schemeBlues[9]);
            
        // const color10 = d3.scaleThreshold()
        //     .domain(d3.range(2, 10))
        //     .range(d3Chromatic.schemeBlues[9]);
        
        const xPosition = d3.scaleLinear()
            .domain([1, 10])
            .rangeRound([600, 860]);
        // console.log(d3Chromatic.schemeBlues[9])
        g.selectAll('rect')
            .data(color.range()
            .map(function(d) {
                console.log(d);
                d = color.invertExtent(d);
                console.log(d);
                // I can possibly replace these with [1, 10]
                if (d[0] === undefined) d[0] = x.domain()[0];
                if (d[1] === undefined) d[1] = x.domain()[0];
                return d;
            })
            )
            .enter().append('rect')
                .attr('height', 8)
                .attr('x', function(d, i) { return xPosition(i + 1); })
                .attr('width', function(d) { return 29; })
                .attr('fill', function(d, i) { return d3Chromatic.schemeBlues[9][i]; });
                
        g.append('text')
            .attr('class', 'legend-title')
            .attr('x', 600) // 600
            .attr('y', -6)
            .attr('fill', '#000')
            .attr('text-anchor', 'start')
            .attr('font-weight', 'bold')
            .text('Unemployment rate');
            
        const bsRange = [null, ...fixedRange]
        g.call(d3.axisBottom(xPosition)
            .tickSize(15)
            .tickFormat(function(x, i) { 
                if (i === 1) {
                    return bsRange[i] + '%';
                }
                return bsRange[i] ? bsRange[i] : ''; 
            }))
        .select('.domain')
            .remove();
        console.log(
            d3.select('.legend').selectAll('g')
            .attr('opacity', function(d, i) {
                if (i === 0 || i === 9) return 0;
                else return 1;
            })
        )
    }
    
    render() {
        return (
            <g className="legend"> 

            </g>
        );
    }
}

const mapStateToProps = state => ({
    categoryName: state.categoryName,
    categoryStateData: state.categoryStateData,
    categoryCountyData: state.categoryCountyData,
});

export default connect(mapStateToProps)(Legend);