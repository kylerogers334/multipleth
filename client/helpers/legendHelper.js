import * as d3 from 'd3';
import * as d3Chromatic from 'd3-scale-chromatic';

export const legendHelper = category => {
    switch (category) {
        case null: return legendClearHelper;
        case 'unemployment': return legendUnemploymentHelper;
        case 'population': return legendPopulationHelper;
        case 'load': return legendLoadHelper;
        case 'number-fix': return legendNumberFixerHelper;
    }
};

function legendClearHelper() {
    // replaces legend with an empty <g>
    const svg = d3.select('svg');
    svg.select('.legend').remove();
    svg.append('g').attr('class', 'legend');
}

function legendUnemploymentHelper(categoryStateData) {
    const dataValues = [];
        categoryStateData.forEach(s => {
            dataValues.push(s.rate);
        });
    return dataValues.sort((a, b) => a - b);
}

function legendPopulationHelper(categoryStateData) {
    const dataValues = [];
        categoryStateData.forEach(s => {
            dataValues.push(s.population);
        });
        console.log('pop', dataValues.sort((a, b) => a - b))
    return dataValues.sort((a, b) => a - b);
}

function legendLoadHelper(adjustedRange, category) {
    let g;
    const countyRendered = d3.selectAll('#overlay-container > g');
    if (countyRendered.size() === 1) {
        g = countyRendered;
    } else {
        g = d3.select('.legend');
    }
    
    g.attr('transform', 'translate(0,40)')
        .attr('z-index', '150').raise();
    
    const color = d3.scaleThreshold()
        .domain(adjustedRange)
        .range(d3Chromatic.schemeBlues[9]);
    
    const xPosition = d3.scaleLinear()
        .domain([1, 10])
        .rangeRound([600, 860]);

    g.selectAll('rect')
        .data(color.range())
        .enter().append('rect')
            .attr('height', 8)
            .attr('x', function(d, i) { return xPosition(i + 1); })
            .attr('width', 29)
            .attr('fill', function(d, i) { return d3Chromatic.schemeBlues[9][i]; });
            
    g.append('text')
        .attr('class', 'legend-title')
        .attr('x', 600)
        .attr('y', -6)
        .attr('fill', '#000')
        .attr('text-anchor', 'start')
        .attr('font-weight', 'bold')
        .text('Unemployment rate');
    
    // shiftedRange moves tick location to the right by 1.
    const shiftedRange = [null, ...adjustedRange];
    g.call(d3.axisBottom(xPosition)
        .tickSize(15)
        .tickFormat(function(d, i) { 
            return shiftedRange[i] ? shiftedRange[i] : ''; 
        }))
    .select('.domain')
        .remove();
    
    // hide the ticks on both ends
    d3.selectAll('.legend').selectAll('g')
    .attr('opacity', function(d, i) {
        if (i === 0 || i === 9) return 0;
        else return 1;
    });
}

function legendNumberFixerHelper(n, currentView, category) {
    const f = d3.formatPrefix;
    // console.log(f('.1', 1e6)(n))
    switch(currentView) {
        case 'state': {
            switch(category) {
                case 'unemployment': return f('.1', 1e1)(n);
                case 'population': return f('.1', 1e6)(n);
            }
        }
            
        case 'county': {
            switch(category) {
                case 'unemployment': return f('.1', 1e1)(n);
                case 'population': return f('.1', 1e4)(n);
            }
        }
    }
}