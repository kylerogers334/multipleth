import React from 'react';
import styled from 'styled-components';

import EnlargedState from './EnlargedState';
import CountyLegend from '../Legend/CountyLegend';
import CloseOverlayButton from './CloseOverlayButton';

const OverlayContainer = styled.g({
	fill: '#FFF',
	transition: 'all 0.75s ease'
});

const StateOverlay = styled.rect({
	height: 600,
	width: 960
});

export const Overlay = () => (
	<OverlayContainer id="overlay-container">
		<CountyLegend />
		<StateOverlay />
		<EnlargedState />
		<CloseOverlayButton />
	</OverlayContainer>
);

export default Overlay;
