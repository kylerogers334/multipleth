import * as d3 from 'd3';
import * as d3Chromatic from 'd3-scale-chromatic';

export const stateHelper = category => {
    switch (category) {
        case 'unemployment': return stateUnemploymentHelper;
    }
};

function stateUnemploymentHelper() {
    const reactThis = this;
    console.log('reactThis ->', reactThis);
    const color = d3.scaleThreshold()
                .domain(d3.range(2, 16))
                .range(d3Chromatic.schemeBlues[9]);
    
    d3.select('#states-container').selectAll('path')
        .style('fill', function(d, i) {
            console.log('d3 this -> ', this);
            const state = d3.select(this).attr('id');
            const match = reactThis.props.categoryData
                        .find(function(d) {if (d.name === state) return d;});
            return color(match.rate);
        });
}