import React from 'react';
import {connect} from 'react-redux';

import {clearMap, fetchCategoryState} from '../actions/actionHandleData.js';
import {fetchCategoryCounty} from '../actions/actionHandleData.js';

export class Form extends React.Component {
    constructor(props) {
        super(props);
        
    }
    
    handleSelection(selection) {
        if (selection=== 'clear') {
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
        // return (
        //     <form onSubmit={e => this.handleSubmit(e)}>
        //         <select ref={selection => this.selection = selection}>
        //             <option value="null">Pick an option</option>
        //             <option value="unemployment">Unemployment</option>
        //             <option value="population">Population</option>
        //             <option value="income">Income</option>
        //             <option value="clear">Clear Map</option>
        //         </select>
        //         <input type="submit" />
        //     </form>
        // );
        
        return (
            <div className="form-container">
                <div className="form-item" 
                    onClick={this.handleSelection('unemployment')}
                    >
                    Unemployment
                </div>
                <div className="form-item">Income</div>
                <div className="form-item">Population</div>
                <div className="form-item">TODO</div>
                <div className="form-item">TODO</div>
                <div className="form-item">TODO</div>
                <div className="form-item">TODO</div>
                <div className="form-item">TODO</div>
                <div className="form-item">TODO</div>
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