import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { changeColor } from '../../actions/actionMap.js';

const Container = styled.div({
	backgroundColor: '#FFFFFF',
	border: '1px solid #000000',
	borderRight: 'none',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-evenly',
	marginLeft: '-3%',
	width: '54px'
});

const PalleteItem = styled.div(({ backgroundColor, selected }) => ({
	backgroundColor,
	border: selected ? '1.5px solid #000000' : 'none',
	cursor: 'pointer',
	height: selected ? '19px' : '22px',
	margin: '1px 4px'
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
