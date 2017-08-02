import React from 'react';
import {connect} from 'react-redux';

import {countyHelper} from '../helpers/countyHelpers.js';
import {fetchCategoryCounty} from '../actions/actionHandleData.js';

export class EnlargedState extends React.Component {
    constructor(props) {
        super(props);
    }
    
    componentWillUpdate(nextProps, nextState) {
        if (nextProps.categoryCountyData) {
            countyHelper(this.props.categoryName)(this.props.categoryCountyData);
        }
    }
    
    componentDidMount() {
        if (this.props.categoryName) {
            this.props.dispatch(fetchCategoryCounty(this.props.categoryName));
        }
        // Always show an empty state;
        countyHelper('blankLoad').call(this);
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
    enlargedState: state.enlargedState,
    categoryCountyData: state.categoryCountyData,
    categoryName: state.categoryName,
});

export default connect(mapStateToProps)(EnlargedState);