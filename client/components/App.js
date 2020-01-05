import React from 'react';
import { connect } from 'react-redux';
import { createGlobalStyle } from 'styled-components';

import { showModal } from '../actions/actionInfoModal';
import Map from './Map/Map';
import Form from './Form/Form';
import Button from './Button';
import InfoModal from './InfoModal';

const GlobalStyle = createGlobalStyle({
	path: {
		fill: '#FFF',
		stroke: '#000'
	},
	a: {
		textDecoration: 'none',
		position: 'relative',
		fontFamily: 'Roboto Slab, serif',
		letterSpacing: '1px',
		fontWeight: 'lighter',
		color: '#000'
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

const App = ({ dispatch, showModalType }) => (
	<div>
		<GlobalStyle />
		{showModalType ? <InfoModal type={showModalType} /> : null}
		<Button onClick={() => dispatch(showModal('about'))} text="About" />
		<Button onClick={() => dispatch(showModal('help'))} text="Help" />
		<Map />
		<Form />
	</div>
);

const mapStateToProps = state => ({
	showInfoModal: state.showInfoModal,
	showModalType: state.showModalType
});

export default connect(mapStateToProps)(App);
