import React from 'react';
import { connect } from 'react-redux';

import Map from './Map/Map';
import Form from './Form/Form';
import AboutButton from './InfoModal/AboutButton';
import HelpButton from './InfoModal/HelpButton';
import HelpModal from './InfoModal/HelpModal';
import AboutModal from './InfoModal/AboutModal';

const App = props => (
	<div id="main-container">
		{props.showInfoModal === 'help' ? <HelpModal /> : <AboutModal />}
		<AboutButton />
		<HelpButton />
		<Map />
		<Form />
	</div>
);

const mapStateToProps = state => ({
	showInfoModal: state.showInfoModal
});

export default connect(mapStateToProps)(App);
