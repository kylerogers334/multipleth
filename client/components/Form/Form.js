import React from 'react';
import { connect } from 'react-redux';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import ColorPicker from './ColorPicker';

import { clearMap, fetchCategoryState } from '../../actions/actionHandleData';
import { fetchCategoryCounty } from '../../actions/actionHandleData';

import './Form.css';

export class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            populationDropdownOpen: false,
            housingDropdownOpen: false,
            cssSelection: ''
        };
    }
    
    toggleDropdown(selection) {
        this.setState({
            [selection]: !this.state[selection]
        });
    }
    
    applySelectedClass(selection) {
        // handle dropdowns
        if ((['white', 'black', 'asian'].includes(this.state.cssSelection) && selection === 'population')
            || (this.state.cssSelection === 'rent' && selection === 'housing')
        ) {
            return ' selected-outline';
        }

        if (this.state.cssSelection === selection) {
            return ' selected-outline';
        }

        return '';
    }
    
    
    handleSelection(selection) {
        if (selection === 'ignore') {
            return;
        }
        
        this.setState({
            cssSelection: selection
        });
        
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
                        <div className={'selection-item' + this.applySelectedClass('unemployment')}>
                            <a onClick={() => this.handleSelection('unemployment')} href="#">
                                Unemployment
                            </a>
                        </div>
                        <Dropdown 
                            id="population-dropdown"
                            
                            style={this.state.selected}
                            isOpen={this.state.populationDropdownOpen} 
                            toggle={() => this.toggleDropdown('populationDropdownOpen')}
                        >
                            <DropdownToggle 
                                caret
                                className={this.applySelectedClass('population')}
                            >
                                Population
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem 
                                    onClick={() => this.handleSelection('population')}
                                >
                                    Total
                                </DropdownItem>
                                <DropdownItem 
                                    onClick={() => this.handleSelection('white')}
                                >
                                    White
                                </DropdownItem>
                                <DropdownItem 
                                    onClick={() => this.handleSelection('black')}
                                >
                                    Black
                                </DropdownItem>
                                <DropdownItem 
                                    onClick={() => this.handleSelection('asian')}
                                >
                                    Asian
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <div className={'selection-item' + this.applySelectedClass('income')}>
                            <a onClick={() => this.handleSelection('income')} href="#">
                                Income
                            </a>
                        </div>
                        <div className={'selection-item' + this.applySelectedClass('age')}>
                            <a onClick={() => this.handleSelection('age')} href="#">
                                Age
                            </a>
                        </div>
                        <div className={'selection-item' + this.applySelectedClass('education')}>
                            <a onClick={e => this.handleSelection('education')} href="#">
                                Education
                            </a>
                        </div>
                        <Dropdown
                            id="housing-dropdown"
                            style={this.state.selected}
                            isOpen={this.state.housingDropdownOpen} 
                            toggle={() => this.toggleDropdown('housingDropdownOpen')}
                        >
                            <DropdownToggle 
                                caret
                                className={this.applySelectedClass('housing')}
                            >
                                Housing Cost
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem 
                                    onClick={() => this.handleSelection('housing')}
                                >
                                    Purchase
                                </DropdownItem>
                                <DropdownItem 
                                    onClick={() => this.handleSelection('rent')}
                                >
                                    Rent
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <div className={'selection-item' + this.applySelectedClass('TODO')}>
                            <a onClick={e => this.handleSelection('TODO')} href="#">TODO</a>
                        </div>
                        <div className={'selection-item' + this.applySelectedClass('election')}>
                            <a onClick={e => this.handleSelection('election')} href="#">2016 Election</a>
                        </div>
                        <div className={'selection-item' + this.applySelectedClass(' ')}>
                            <a onClick={e => this.handleSelection('clear')} href="#">Clear Map</a>
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