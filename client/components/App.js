import React from 'react';
import {connect} from 'react-redux';

import Map from './Map.js';
import Form from './Form.js';

export class App extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div id="main-container">
                <Map />
                <Form />
            </div>
        );
    }
}