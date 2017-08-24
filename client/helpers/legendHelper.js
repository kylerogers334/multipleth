import * as d3 from 'd3';

import colorSelector from './colorHelpers';
import store from '../store.js';

export const legendHelper = category => {
    const luh = legendUniversalHelper;
    switch (category) {
        case null: return legendClearHelper;
        case 'unemployment': return luh('rate');
        case 'population': return luh('population');
        case 'income': return luh('median_income');
        case 'age': return luh('median_age');
        case 'education': return luh('percent_bach_degree');
        case 'housing': return luh('median_cost');
        case 'rent': return luh('median_rent');
        case 'white': return luh('white');
        case 'black': return luh('black');
        case 'asian': return luh('asian');
        case 'load': return legendLoadHelper;
        case 'number-fix': return legendNumberFixerHelper;
        case 'range-adjust': return legendRangeAdjustHelper;
    }
};

function legendClearHelper() {
    // replaces legend with an empty <g>
    d3.select('.state-legend').remove();
    d3.select('.county-legend').remove();
    
    d3.select('#states-container')
        .append('g')
        .attr('class', 'state-legend');
        
    d3.select('#overlay-container')
        .append('g')
        .attr('class', 'county-legend');
}

function legendRangeAdjustHelper(currentView, categoryName, data) {
    const dataMin = d3.quantile(data, 0.05);
    const dataMax = d3.quantile(data, 0.95);
    const steps = (dataMax - dataMin) / 8;
    return d3.range(dataMin, dataMax, steps).map(function(i) {
        return legendHelper('number-fix')(i, currentView, categoryName);
    });
}

function legendUniversalHelper(dataKey) {
    return function(categoryData) {
        return categoryData.map(d => d[dataKey]).sort((a, b) => a - b);
    };
}

function legendLoadHelper(adjustedRange, category, currentView) {
    let g;
    if (currentView === 'county') { 
        // the selection -> remove -> reapply on both blocks fixes a bug where 
        // colors dont update correctly
        d3.select('.county-legend').remove();
        d3.select('#overlay-container')
            .append('g')
            .attr('class', 'county-legend');
            
        g = d3.select('.county-legend');
    } else {
        d3.select('.state-legend').remove();
        d3.select('#states-container')
            .append('g')
            .attr('class', 'state-legend');
            
        g = d3.select('.state-legend');
    }
    
    g.attr('transform', 'translate(0,40)')
        .raise();
    
    const selectedColor = colorSelector(store.getState().color);

    const color = d3.scaleThreshold()
        .domain(adjustedRange)
        .range(selectedColor);
    
    const xPosition = d3.scaleLinear()
        .domain([0, 9])
        .rangeRound([541, 864]);

    g.selectAll('rect')
        .data(color.range())
        .enter().append('rect')
            .attr('height', 8)
            .attr('x', function(d, i) { return xPosition(i); })
            .attr('width', 37)
            .attr('fill', function(d, i) { return selectedColor[i]; })
            .on('mouseover', function() {
                d3.select(this)
                    .style('fill-opacity', 0.8);
            })
            .on('mouseout', function() {
                d3.select(this)
                    .style('fill-opacity', 1);
            });
    
    // Fixes an issue with text not being changed
    d3.selectAll('.state-legend-title').remove();
    if (currentView === 'county') d3.selectAll('.county-legend-title').remove();
    
    g.append('text')
        .attr('class', function() {
            if (currentView === 'county') return 'county-legend-title';
            else return 'state-legend-title';
        })
        .attr('x', 541)
        .attr('y', -6)
        .attr('fill', '#000')
        .attr('text-anchor', 'start')
        .attr('font-size', '11px')
        .attr('font-family', 'Roboto Slab, serif')
        .attr('letter-spacing', '0.5px')
        .text(legendTextHelper(category));
    
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
    d3.select('.state-legend').selectAll('g')
    .attr('opacity', function(d, i) {
        if (i === 0 || i === 9) return 0;
        else return 1;
    });
    
    d3.select('.county-legend').selectAll('g')
    .attr('opacity', function(d, i) {
        if (i === 0 || i === 9) return 0;
        else return 1;
    });
}

function legendNumberFixerHelper(n, currentView, category) {
    const f = d3.formatPrefix;
    switch(currentView) {
        case 'state': {
            switch(category) {
                case 'unemployment': return f('.1', 1e1)(n);
                case 'population': return f('.1', 1e6)(n);
                case 'income': return f('.1', 1e4)(n);
                case 'age': return f('.1', 1e1)(n);
                case 'education': return f('.1', 1e1)(n);
                case 'housing': return f('.1', 1e1)(n);
                case 'rent': return f('.1', 1e1)(n);
                case 'white': return f('.1', 1e1)(n);
                case 'black': return f('.1', 1e1)(n);
                case 'asian': return f('.1', 1e1)(n);
            }
        }
            
        case 'county': {
            switch(category) {
                case 'unemployment': return f('.1', 1e1)(n);
                case 'population': return f('.1', 1e5)(n);
                case 'income': return f('.1', 1e4)(n);
                case 'age': return f('.1', 1e1)(n);
                case 'education': return f('.1', 1e1)(n);
                case 'housing': return f('.1', 1e1)(n);
                case 'rent': return f('.1', 1e1)(n);
                case 'white': return f('.1', 1e1)(n);
                case 'black': return f('.1', 1e1)(n);
                case 'asian': return f('.1', 1e1)(n);
            }
        }
    }
}

function legendTextHelper(category) {
    switch(category) {
        case 'unemployment': return 'Unemployment Rate';
        case 'population': return 'Total Population';
        case 'income': return 'Median Income';
        case 'age': return 'Median Age';
        case 'education': return '% of Population w/ Bachelor\'s degrees or higher';
        case 'housing': return 'Median Housing Cost';
        case 'rent': return 'Median Rent';
        case 'white': return '% of Population is White/Latino';
        case 'black': return '% of Population is Black';
        case 'asian': return '% of Population is Asian';
    }
}
