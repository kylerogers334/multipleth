import React from 'react';
import { connect } from 'react-redux';
import { changeColor } from '../../actions/actionMap.js';

import './ColorPicker.css';

export class ColorPicker extends React.Component {
    render() {
        const PalleteItems = ['blue', 'purple', 'red', 'orange', 'green', 'gray']
            .map((color, i) => {
                return (
                    <div className={`palette-item ${color} 
                        ${this.props.color === color ? 'pallete-selected': ''}`}
                     onClick={() => this.props.dispatch(changeColor(color))}
                     key={i}>
                    </div>
                );
            });

        return (
            <div id="color-picker">
                {PalleteItems}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    color: state.color
});

export default connect(mapStateToProps)(ColorPicker);