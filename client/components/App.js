import React from 'react';
import { connect } from 'react-redux';
import { createGlobalStyle } from 'styled-components';

import { showModal } from '../actions/actionInfoModal';
import { hideOverlay } from '../actions/actionOverlay';
import Map from './Map/Map';
import Form from './Form/Form';
import Button from './Button';
import InfoModal from './InfoModal';

const GlobalStyle = createGlobalStyle({
	path: {
		fill: '#FFFFFF',
		stroke: '#000000'
	},
	a: {
		textDecoration: 'none',
		position: 'relative',
		fontFamily: 'Roboto Slab, serif',
		letterSpacing: '1px',
		fontWeight: 'lighter',
		color: '#000000'
	},
	'a:active': {
		top: '2px'
	},
	'a:visited': {
		textDecoration: 'none'
	},
	p: {
		fontFamily: 'Roboto Slab, serif'
	}
});

const App = ({ dispatch, displayOverlay, showModalType }) => (
	<div>
		<GlobalStyle />
		{showModalType ? <InfoModal type={showModalType} /> : null}
		<Button onClick={() => dispatch(showModal('about'))} text="About" />
		<Button onClick={() => dispatch(showModal('help'))} text="Help" />
		{displayOverlay ? (
			<Button
				css={{ position: 'absolute', right: '50%', top: '8px' }}
				onClick={() => dispatch(hideOverlay())}
				text="Back"
			/>
		) : null}
		<Map />
		<Form />
	</div>
);

const mapStateToProps = state => ({
	displayOverlay: state.displayOverlay,
	showInfoModal: state.showInfoModal,
	showModalType: state.showModalType
});

export default connect(mapStateToProps)(App);
