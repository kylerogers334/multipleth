import React from 'react';
import {connect} from 'react-redux';

import {clearMap, fetchCategoryState} from '../actions/actionHandleData.js';
import {fetchCategoryCounty} from '../actions/actionHandleData.js';

export class Form extends React.Component {
    constructor(props) {
        super(props);
        
    }
    
    handleSubmit(e) {
        e.preventDefault();
        if (this.selection.value === null) {
            return;
        }
        
        else if (this.selection.value === 'clear') {
            this.props.dispatch(clearMap());
        } 
        
        else if (!this.props.enlargedState) {
            this.props.dispatch(fetchCategoryState(this.selection.value));
        } 
        
        else {
            this.props.dispatch(fetchCategoryState(this.selection.value));
            this.props.dispatch(
                fetchCategoryCounty(
                    this.selection.value, 
                    this.props.enlargedState.attributes[2].value
                )
            );
        }
    }

    render() {
        return (
            <form onSubmit={e => this.handleSubmit(e)}>
                <select ref={selection => this.selection = selection}>
                    <option value="null">Pick an option</option>
                    <option value="unemployment">Unemployment</option>
                    <option value="population">Population</option>
                    <option value="clear">Clear Map</option>
                </select>
                <input type="submit" />
            </form>
        );
    }
}

const mapStateToProps = state => ({
    enlargedState: state.enlargedState,
    categoryStateData: state.categoryStateData,
    categoryCountyData: state.categoryCountyData,
    categoryName: state.categoryName,
});

export default connect(mapStateToProps)(Form);