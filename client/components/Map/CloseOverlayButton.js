import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { hideOverlay } from '../../actions/actionOverlay';

const Container = styled.g({
	marginLeft: '10px',
	marginTop: '10px',
	transform: 'translate(889px, 0px)',
	'&:hover': {
		fill: '#FFF',
		transition: 'all 0.75s ease'
	}
});

const Button = styled.rect({
	color: '#000',
	cursor: 'pointer',
	fill: '#FFF',
	height: '31px',
	rx: '5px',
	ry: '5px',
	stroke: '#000',
	width: '70px',
	'&:hover': {
		fill: '#000',
		transition: 'fill 0.5s ease'
	}
});

const Text = styled.text({
	cursor: 'pointer',
	fill: '#000',
	fontFamily: 'Roboto Slab, serif',
	fontSize: 15,
	textAnchor: 'middle',
	transform: 'translate(35px, 21px)',
	'&:hover': {
		fill: '#FFF',
		transition: 'fill 0.3s ease'
	}
});

const CloseOverlayButton = ({ dispatch }) => (
	<Container onClick={() => dispatch(hideOverlay())}>
		<Button />
		<Text>Back</Text>
	</Container>
);

export default connect()(CloseOverlayButton);
