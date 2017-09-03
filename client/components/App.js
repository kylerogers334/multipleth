import React from 'react';
import { connect } from 'react-redux';

import Map from './Map/Map';
import Form from './Form/Form';
import AboutButton from './InfoModal/AboutButton';
import HelpButton from './InfoModal/HelpButton';
import HelpModal from './InfoModal/HelpModal';
import AboutModal from './InfoModal/AboutModal';

export class App extends React.Component {
    displayModal() {
        if (this.props.showInfoModal === 'help') {
            return <HelpModal />;
        } else if (this.props.showInfoModal === 'about') {
            return <AboutModal />;
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