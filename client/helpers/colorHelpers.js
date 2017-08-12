import * as d3Chromatic from 'd3-scale-chromatic';

export default function(color) {
    switch(color) {
        case 'gray': return d3Chromatic.schemeGreys[9];
        case 'red': return d3Chromatic.schemeReds[9];
        case 'orange': return d3Chromatic.schemeOranges[9];
        case 'purple': return d3Chromatic.schemePurples[9];
        case 'blue': return d3Chromatic.schemeBlues[9];
        case 'green': return d3Chromatic.schemeGreens[9];
    }
}