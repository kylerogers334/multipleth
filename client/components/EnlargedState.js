import React from 'react';
import {connect} from 'react-redux';
import * as d3 from 'd3';
import * as topojson from 'topojson';

export class EnlargedState extends React.Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        const state = d3.select('.state-enlarged');
        
        const dimensions = state.node().getBBox();
        const scale = (dimensions.x > dimensions.y) ?
            Math.floor(600 / dimensions.height) :
            Math.floor(960 / dimensions.width);
            
        const tX = (-scale) * dimensions.x + 50;
        const tY = (-scale) * dimensions.y + 50;
        
        state.attr('transform', `translate(${tX}, ${tY}) scale(${scale}, ${scale})`)
            .attr('stroke-width', `${1/scale * 2}`);

        d3.json('./us-10m.v1.json', (error, us) => {
            // extracting data-FIPS-num attribute with correct format
            const temp = this.props.enlargedState.attributes[2].value;
            const fipsNum = (temp.length === 1) ? '0' + temp : temp;
            
            const counties = us.objects.counties.geometries;
            us.objects.counties.geometries = counties.filter(c => {
                return c.id.slice(0, 2) === fipsNum;
            });
            
            d3.select('#overlay-container')
                .selectAll('path')
                .data(topojson.feature(us, us.objects.counties).features)
                .enter().append('path')
                .attr('class', 'county')
                .attr('d', d3.geoPath())
                .attr('transform', `translate(${tX}, ${tY}) scale(${scale}, ${scale})`)
                .attr('stroke-width', `${1/scale * 2}`);
        });
    }
    
    render() {
        return (
                <path
                    d={this.props.enlargedState.attributes[0].value}
                    className='state-enlarged'
                    id={this.props.enlargedState.id}
                ></path>
        );
    }
}

const mapStateToProps = state => ({
    usStatesData: state.usStatesData,
    enlargedState: state.enlargedState
});

export default connect(mapStateToProps)(EnlargedState);