import * as d3 from 'd3';
import * as d3Chromatic from 'd3-scale-chromatic';

export const stateHelper = category => {
    switch (category) {
        case 'unemployment': return stateUnemploymentHelper;
    }
};

function stateUnemploymentHelper(categoryData) {
    const color = d3.scaleThreshold()
                .domain(d3.range(2.3, 6.9, 0.5))
                .range(d3Chromatic.schemeBlues[9]);
    
    d3.select('#states-container').selectAll('path')
        .style('fill', function(d, i) {
            const state = d3.select(this).attr('id');
            const match = categoryData.find(function(d) {
                if (d.name === state) return d;
            });
            return color(match.rate);
        });
}