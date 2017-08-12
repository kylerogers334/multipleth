import React from 'react';
import {connect} from 'react-redux';

import ColorPicker from './ColorPicker.js';

import {clearMap, fetchCategoryState} from '../actions/actionHandleData.js';
import {fetchCategoryCounty} from '../actions/actionHandleData.js';

export class Form extends React.Component {
    handleSelection(e) {
        const selection = e.target.parentElement.getAttribute('name');
        
        if (selection === 'clear') {
            this.props.dispatch(clearMap());
        } 
        
        else if (!this.props.enlargedState) {
            this.props.dispatch(fetchCategoryState(selection));
        } 
        
        else {
            this.props.dispatch(fetchCategoryState(selection));
            this.props.dispatch(
                fetchCategoryCounty(
                    selection, 
                    this.props.enlargedState.attributes[2].value
                )
            );
        }
    }

    render() {
        return (
            <div className="form-container">
                <ColorPicker />
                <div className="selection-container">
                    <div className="selection-items-container">
                        <div className="selection-item" name="unemployment">
                            <a onClick={e => this.handleSelection(e)} href="#">Unemployment</a>
                        </div>
                        <div className="selection-item" name="population">
                            <a onClick={e => this.handleSelection(e)} href="#">Population</a>
                        </div>
                        <div className="selection-item" name="income">
                            <a onClick={e => this.handleSelection(e)} href="#">Income</a>
                        </div>
                        <div className="selection-item" name="TODO">
                            <a onClick={e => this.handleSelection(e)} href="#">TODO</a>
                        </div>
                        <div className="selection-item" name="TODO">
                            <a onClick={e => this.handleSelection(e)} href="#">TODO</a>
                        </div>
                        <div className="selection-item" name="TODO">
                            <a onClick={e => this.handleSelection(e)} href="#">TODO</a>
                        </div>
                        <div className="selection-item" name="TODO">
                            <a onClick={e => this.handleSelection(e)} href="#">TODO</a>
                        </div>
                        <div className="selection-item" name="TODO">
                            <a onClick={e => this.handleSelection(e)} href="#">TODO</a>
                        </div>
                        <div className="selection-item" name="clear">
                            <a onClick={e => this.handleSelection(e)} href="#">Clear Map</a>
                        </div>
                    </div>
                </div>
            </div>
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