import React from 'react';
import {connect} from 'react-redux';

import {setFormSelect} from '../actions/actionForm.js';
import {clearMap, fetchCategoryState} from '../actions/actionHandleData.js';

export class Form extends React.Component {
    constructor(props) {
        super(props);
    }
    
    handleSelection(e) {
        // prevent the default form option from changing state
        if (e.target.value !== 'null') {
            this.props.dispatch(setFormSelect(e.target.value));
        }
    }
    
    handleSubmit(e) {
        e.preventDefault();
        console.log('Form selection: ', this.props.formSelection);
        if (this.props.formSelection === 'clear') {
            console.log('clearMap dispatched');
            this.props.dispatch(clearMap());
        } else {
            this.props.dispatch(fetchCategoryState(this.props.formSelection));
        }
    }

    render() {
        return (
            <form onSubmit={e => this.handleSubmit(e)}>
                <select value={this.props.formSelection || "Pick an option"} onChange={e => this.handleSelection(e)}>
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
    formSelection: state.formSelection
});

export default connect(mapStateToProps)(Form);