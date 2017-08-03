import * as d3 from 'd3';
import * as d3Chromatic from 'd3-scale-chromatic';

export const stateHelper = category => {
    switch (category) {
        case 'clear/state': return clearDataHelper;
        case 'unemployment': return stateUnemploymentHelper;
    }
};

function clearDataHelper(categoryData) {
    console.log('clearDataHelper NYI');
}

function stateUnemploymentHelper(categoryStateData) {
    const rateArr = categoryStateData.map(county => {
        return county.rate;
    });
    const dataMin = Math.min(...rateArr);
    const dataMax = Math.max(...rateArr);
    const steps = (dataMax - dataMin) / d3Chromatic.schemeBlues[9].length;
    const color = d3.scaleThreshold()
                .domain(d3.range(dataMin, dataMax, steps))
                .range(d3Chromatic.schemeBlues[9]);
                
    const dataAsObj = {};
    categoryStateData.forEach(c => {
        dataAsObj[c.name] = c.rate;
    });
    
    d3.select('#states-container').selectAll('path')
        .style('fill', function(d, i) {
            return color(dataAsObj[d3.select(this).attr('id')]);
        });
}

