import * as d3 from 'd3';

import colorSelector from './colorHelpers';
import store from '../store';

export const stateHelper = category => {
    const suh = stateUniversalHelper;
    switch (category) {
        case 'clear': return stateClearHelper;
        case 'unemployment': return suh('rate');
        case 'population': return suh('population');
        case 'income': return suh('median_income');
        case 'age': return suh('median_age');
        case 'education': return suh('percent_bach_degree');
        case 'housing': return suh('median_cost');
        case 'rent': return suh('median_rent');
        case 'white': return suh('white');
        case 'black': return suh('black');
        case 'asian': return suh('asian');
    }
};

function stateClearHelper(categoryData) {
    d3.select('#states-container').selectAll('path')
        .transition().duration(750)
        .style('fill', 'white');
}

function stateUniversalHelper(dataKey) {
    return function(categoryStateData) {
        const dataAsObj = {};
        categoryStateData.forEach(state => {
            dataAsObj[state.name] = state[dataKey];
        });
        
        stateDataHelper(dataAsObj);
    };
}

function stateDataHelper(data, selectedColor) {
    const values = Object.values(data).sort((a, b) => a - b);
    const dataMin = d3.quantile(values, 0.15);
    const dataMax = d3.quantile(values, 0.95);
    const steps = (dataMax - dataMin) / 9;
    const color = d3.scaleThreshold()
                .domain(d3.range(dataMin, dataMax, steps))
                .range(colorSelector(store.getState().color));

    d3.select('#states-container').selectAll('path')
        .transition().duration(750)
        .style('fill', function(d, i) {
            return color(data[d3.select(this).attr('id')]);
        });
}