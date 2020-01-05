import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { changeColor } from '../../actions/actionMap.js';

const Container = styled.div({
	backgroundColor: '#FFF',
	border: '1px solid #000',
	borderRadius: '5px 0px 0px 5px',
	height: '160px',
	marginLeft: '-3%',
	width: '54px'
});

const PalleteItem = styled.div(({ backgroundColor, selected }) => ({
	backgroundColor,
	border: selected ? '1.5px solid #000' : 'none',
	height: '20px',
	margin: '5.7px',
	width: '40px'
}));

export const ColorPicker = ({ color: selectedColor, dispatch }) => {
	const PalleteItems = [
		{ name: 'blue', hex: '#6BAED6' },
		{ name: 'purple', hex: '#9E9AC8' },
		{ name: 'red', hex: '#FB6A4A' },
		{ name: 'orange', hex: '#FD8D3C' },
		{ name: 'green', hex: '#74C476' },
		{ name: 'gray', hex: '#969696' }
	].map((color, idx) => (
		<PalleteItem
			backgroundColor={color.hex}
			key={idx}
			onClick={() => dispatch(changeColor(color.name))}
			selected={color.name === selectedColor}
		/>
	));

	return <Container>{PalleteItems}</Container>;
};

const mapStateToProps = state => ({
	color: state.color
});

export default connect(mapStateToProps)(ColorPicker);
