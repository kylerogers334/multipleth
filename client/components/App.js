import React from 'react';
import { connect } from 'react-redux';

import Map from './Map/Map.js';
import Form from './Form/Form.js';
import AboutButton from './InfoModal/AboutButton.js';
import HelpButton from './InfoModal/HelpButton.js';
import HelpModal from './InfoModal/HelpModal.js';
import AboutModal from './InfoModal/AboutModal.js';

export class App extends React.Component {
    displayModal() {
        console.log('displayModal called, props ->', this.props.showInfoModal);
        if (this.props.showInfoModal === 'help') {
            return <HelpModal />;
        } else if (this.props.showInfoModal === 'about') {
            return <AboutModal />;
        } else {
            return;
        }
    }
    
    render() {
        return (
            <div id="main-container">
                {this.displayModal()}
                <AboutButton />
                <HelpButton />
                <Map />
                <Form />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    showInfoModal: state.showInfoModal
});

export default connect(mapStateToProps)(App);