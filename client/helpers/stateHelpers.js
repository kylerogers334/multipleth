import * as d3 from 'd3';
import * as d3Chromatic from 'd3-scale-chromatic';

export const stateHelper = category => {
    switch (category) {
        case 'clear': return stateClearHelper;
        case 'unemployment': return stateUnemploymentHelper;
        case 'population': return statePopulationHelper;
    }
};

function stateClearHelper(categoryData) {
    d3.select('#states-container').selectAll('path')
        .style('fill', 'white');
}

function stateUnemploymentHelper(categoryStateData) {
    const dataAsObj = {};
    categoryStateData.forEach(state => {
        dataAsObj[state.name] = state.rate;
    });
    
    const values = Object.values(dataAsObj);
    const dataMin = Math.min(...values);
    const dataMax = Math.max(...values);
    const steps = (dataMax - dataMin) / d3Chromatic.schemeBlues[9].length;
    const color = d3.scaleThreshold()
                .domain(d3.range(dataMin, dataMax, steps))
                .range(d3Chromatic.schemeBlues[9]);
                
    d3.select('#states-container').selectAll('path')
        .style('fill', function(d, i) {
            return color(dataAsObj[d3.select(this).attr('id')]);
        });
}

function statePopulationHelper(categoryStateData) {
    const dataAsObj = {};
    categoryStateData.forEach(state => {
        dataAsObj[state.name] = state.population;
    });
    
    const values = Object.values(dataAsObj);
    const dataMin = Math.min(...values);
    const dataMax = Math.max(...values) / 2;
    const steps = (dataMax - dataMin) / d3Chromatic.schemeBlues[9].length;
    const color = d3.scaleThreshold()
                .domain(d3.range(dataMin, dataMax, steps))
                .range(d3Chromatic.schemeBlues[9]);

    d3.select('#states-container').selectAll('path')
        .style('fill', function(d, i) {
            return color(dataAsObj[d3.select(this).attr('id')]);
        });
}