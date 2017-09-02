import * as d3 from 'd3';
import * as topojson from 'topojson';

import colorSelector from './colorHelpers';
import store from '../store';

export const countyHelper = category => {
    const cuh = countyUniversalHelper;
    switch (category) {
        case 'clear': return countyClearHelper;
        case 'blankLoad': return blankCountyLoadHelper;
        case 'unemployment': return cuh('rate');
        case 'population': return cuh('population');
        case 'income': return cuh('median_income');
        case 'age': return cuh('median_age');
        case 'education': return cuh('percent_bach_degree');
        case 'housing': return cuh('median_cost');
        case 'rent': return cuh('median_rent');
        case 'white': return cuh('white');
        case 'latino': return cuh('latino');
        case 'black': return cuh('black');
        case 'asian': return cuh('asian');
        case 'crime': return cuh('rate');
        case 'election': return countyElectionHelper();
    }
};

function countyClearHelper() {
    d3.select('#overlay-container').selectAll('path')
        .transition().duration(750)
        .style('fill', 'white');
}

function countyUniversalHelper(dataKey) {
    return function(categoryCountyData) {
        const dataAsObj = {};
        categoryCountyData.forEach(c => {
            dataAsObj[c.fips] = c[dataKey];
        });
        
        countyDataHelper(dataAsObj);
    };
}

function countyElectionHelper() {
    return function(categoryCountyData) {
        const dataAsObj = {};
        categoryCountyData.forEach(c => {
            dataAsObj[c.fips] = c['winner'];
        });

        setTimeout(() => {
            d3.select('#overlay-container').selectAll('path')
                .transition().duration(750)
                .style('fill', function() {
                    const match = dataAsObj[this.attributes[2].value];
                    if (match === undefined) return 'white';
                    return (match === 'Donald Trump' ?
                        '#D22532' : // red
                        '#244999'   // blue
                    );
                });
        }, 150);
    };
}

function blankCountyLoadHelper() {
    const state = d3.select('.state-enlarged');
        
    const dimensions = state.node().getBBox();
    const scale = (dimensions.x > dimensions.y) ?
        Math.floor(600 / dimensions.height) :
        Math.floor(960 / dimensions.width);
        
    const tX = (-scale) * dimensions.x + 50;
    const tY = (-scale) * dimensions.y + 50;
    
    state.attr('transform', `translate(${tX}, ${tY}) scale(${scale}, ${scale})`)
        .attr('stroke-width', `${1 / (scale * 2)}`);

    d3.json('./us-10m.v1.json', (error, us) => {
        // extracting data-FIPS-num attribute with correct format
        const temp = this.props.enlargedState.attributes[2].value;
        const fipsNum = (temp.length === 1) ? '0' + temp : temp;
        const counties = us.objects.counties.geometries;
        us.objects.counties.geometries = counties.filter(c => {
            return c.info.id.slice(0, 2) === fipsNum;
        });
        
        d3.select('#overlay-container').selectAll('path')
            .data(topojson.feature(us, us.objects.counties).features)
            .enter().append('path')
            .attr('class', 'county')
            .attr('id', (d, i) => {
                return us.objects.counties.geometries[i].info.name;
            })
            .attr('data-FIPS-num', (d, i) => {
                return us.objects.counties.geometries[i].info.id;
            })
            .attr('d', d3.geoPath())
            .attr('transform', `translate(${tX}, ${tY}) scale(${scale}, ${scale})`)
            .attr('stroke-width', `${ 1 / (scale * 2) }`)
            .on('mouseover', function() {
                d3.select(this)
                    .style('fill-opacity', 0.8);
            })
            .on('mouseout', function() {
                d3.select(this)
                    .style('fill-opacity', 1);
            })
            .on('click', function() {
                console.log(this.id);
            })
            // Add info on mouseover
            .append('title')
                .text(function() { 
                    return d3.select(this.parentNode).attr('id');
                });
    });
}

function countyDataHelper(data) {
    const values = Object.values(data).sort((a, b) => a - b);
    const dataMin = d3.quantile(values, 0.05);
    const dataMax = d3.quantile(values, 0.95);
    const steps = (dataMax - dataMin) / 9;
    const color = d3.scaleThreshold()
                .domain(d3.range(dataMin, dataMax, steps))
                .range(colorSelector(store.getState().color));
           
    // Timeout prevents bug where reducer changing the categoryCountyData
    // (data received from database) before D3 can draw every county line.
    // If that were to happen, D3 would find no path elements to select and 
    // will not update the color.
    setTimeout(() => {
        d3.select('#overlay-container').selectAll('path')
            .transition().duration(750)
            .style('fill', function() {
                const match = data[this.attributes[2].value];
                return (match === undefined) ? 'white' : color(match);
            });
    }, 150);
}