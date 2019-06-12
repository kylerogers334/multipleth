import React from 'react';
import { connect } from 'react-redux';
import { changeColor } from '../../actions/actionMap.js';

import './ColorPicker.css';

export const ColorPicker = props => {
	const PalleteItems = [
		'blue',
		'purple',
		'red',
		'orange',
		'green',
		'gray'
	].map((color, idx) => (
		<div
			className={`palette-item ${color}
                        ${props.color === color ? 'palette-selected' : ''}`}
			onClick={() => this.props.dispatch(changeColor(color))}
			key={idx}
		/>
	));

	return <div id="color-picker">{PalleteItems}</div>;
};

const mapStateToProps = state => ({
	color: state.color
});

export default connect(mapStateToProps)(ColorPicker);
