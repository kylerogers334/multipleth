import * as d3 from 'd3';
import * as d3Chromatic from 'd3-scale-chromatic';

export const stateHelper = category => {
    switch (category) {
        case 'clear': return stateClearHelper;
        case 'unemployment': return stateUnemploymentHelper;
        case 'population': return statePopulationHelper;
        case 'income': return stateIncomeHelper;
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
    
    stateDataHelper(dataAsObj);
}

function statePopulationHelper(categoryStateData) {
    const dataAsObj = {};
    categoryStateData.forEach(state => {
        dataAsObj[state.name] = state.population;
    });
    
    stateDataHelper(dataAsObj);
}

function stateIncomeHelper(categoryStateData) {
    const dataAsObj = {};
    categoryStateData.forEach(state => {
        dataAsObj[state.name] = state.median_income;
    });
    
    stateDataHelper(dataAsObj);
}

function stateDataHelper(data) {
    const values = Object.values(data).sort((a, b) => a - b);
    const dataMin = d3.quantile(values, 0.15);
    const dataMax = d3.quantile(values, 0.95);
    const steps = (dataMax - dataMin) / d3Chromatic.schemeBlues[9].length;
    const color = d3.scaleThreshold()
                .domain(d3.range(dataMin, dataMax, steps))
                .range(d3Chromatic.schemeBlues[9]);
                
    d3.select('#states-container').selectAll('path')
        .style('fill', function(d, i) {
            return color(data[d3.select(this).attr('id')]);
        });
}