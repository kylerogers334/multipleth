import * as d3 from 'd3';
import * as d3Chromatic from 'd3-scale-chromatic';
import * as topojson from 'topojson';

export const countyHelper = category => {
    switch (category) {
        case 'clear': return countyClearHelper;
        case 'blankLoad': return blankCountyLoadHelper;
        case 'unemployment': return countyUnemploymentHelper;
        case 'population': return countyPopulationHelper;
        case 'income': return countyIncomeHelper;
    }
};

function countyClearHelper() {
    d3.select('#overlay-container').selectAll('path')
        .style('fill', 'white');
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
            .on('click', function() {
                console.log(this.id);
            });
    });
}

function countyUnemploymentHelper(categoryCountyData) {
    const dataAsObj = {};
    categoryCountyData.forEach(c => {
        dataAsObj[c.fips] = c.rate;
    });
    
    countyDataHelper(dataAsObj);
}

function countyPopulationHelper(categoryCountyData) {
    const dataAsObj = {};
    categoryCountyData.forEach(c => {
        dataAsObj[c.fips] = c.population;
    });
    
    countyDataHelper(dataAsObj);
}

function countyIncomeHelper(categoryCountyData) {
    const dataAsObj = {};
    categoryCountyData.forEach(county => {
        dataAsObj[county.fips] = county.median_income;
    });
    
    countyDataHelper(dataAsObj);
}

function countyDataHelper(data) {
    const values = Object.values(data).sort((a, b) => a - b);
    const dataMin = d3.quantile(values, 0.15);
    const dataMax = d3.quantile(values, 0.95);
    const steps = (dataMax - dataMin) / d3Chromatic.schemeBlues[9].length;
    const color = d3.scaleThreshold()
                .domain(d3.range(dataMin, dataMax, steps))
                .range(d3Chromatic.schemeBlues[9]);
           
    // Timeout prevents bug where reducer changing the categoryCountyData
    // (data received from database) before D3 can draw every county line.
    // If that were to happen, D3 would find no path elements to select and 
    // will not update the color.
    setTimeout(() => {
        d3.select('#overlay-container').selectAll('path')
        .style('fill', function() {
            const match = data[this.attributes[2].value];
            return (match === undefined) ? 'red' : color(match);
        });
    }, 150);
}