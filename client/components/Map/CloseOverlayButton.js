import React from 'react';
import { connect } from 'react-redux';
import { hideOverlay } from '../../actions/actionOverlay.js';

import './Map.css';

export class CloseOverlayButton extends React.Component {
    render() {
        return (
            <g className="close-overlay-container"
                onClick={() => this.props.dispatch(hideOverlay())}>
                <rect className="close-overlay-button"></rect>
                <text className="close-overlay-text">Back</text>
            </g>
        );
    }
}

export default connect()(CloseOverlayButton);