import * as d3 from 'd3';
import * as d3Chromatic from 'd3-scale-chromatic';
import * as topojson from 'topojson';

export const countyHelper = category => {
    switch (category) {
        case 'clear': return countyClearHelper;
        case 'blankLoad': return blankCountyLoadHelper;
        case 'unemployment': return countyUnemploymentHelper;
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
            
            d3.select('#overlay-container')
                .selectAll('path')
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
    const rateArr = categoryCountyData.map(county => {
        return county.rate;
    });
    const dataMin = Math.min(...rateArr);
    const dataMax = Math.max(...rateArr);
    const steps = (dataMax - dataMin) / d3Chromatic.schemeBlues[9].length;
    const color = d3.scaleThreshold()
                .domain(d3.range(dataMin, dataMax, steps))
                .range(d3Chromatic.schemeBlues[9]);
                
    const dataAsObj = {};
    categoryCountyData.forEach(c => {
        dataAsObj[c.fips] = c.rate;
    });

    setTimeout(() => {
        d3.select('#overlay-container').selectAll('path')
        .style('fill', function() {
            const match = dataAsObj[this.attributes[2].value];
            return (match === undefined) ? 'red' : color(match);
        });
    }, 100);
    
}