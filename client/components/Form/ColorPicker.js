import React from 'react';
import { connect } from 'react-redux';
import { changeColor } from '../../actions/actionMap';

import './ColorPicker.css';

export class ColorPicker extends React.Component {
    render() {
        return (
            <div id="color-picker">
                <div className="palette-item blue"
                     onClick={() => this.props.dispatch(changeColor('blue'))}>
                </div>
                <div className="palette-item purple"
                     onClick={() => this.props.dispatch(changeColor('purple'))}>
                </div>
                <div className="palette-item red" 
                     onClick={() => this.props.dispatch(changeColor('red'))}>
                </div>
                <div className="palette-item orange"
                     onClick={() => this.props.dispatch(changeColor('orange'))}>
                </div>
                <div className="palette-item green"
                     onClick={() => this.props.dispatch(changeColor('green'))}>
                </div>
                <div className="palette-item gray" 
                     onClick={() => this.props.dispatch(changeColor('gray'))}>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    categoryStateData: state.categoryStateData,
    categoryCountyData: state.categoryCountyData,
    color: state.color
});

export default connect(mapStateToProps)(ColorPicker);