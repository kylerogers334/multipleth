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
    const color = d3.scaleThreshold()
                // data set has largest values 2.3 and 6.8,
                // 2nd param exclusive
                .domain(d3.range(2.3, 6.9, 0.5))
                .range(d3Chromatic.schemeBlues[9]);
    
    d3.select('#states-container').selectAll('path')
        .style('fill', function(d, i) {
            const state = d3.select(this).attr('id');
            const match = categoryStateData.find(function(d) {
                if (d.name === state) return d;
            });
            return color(match.rate);
        });
}

