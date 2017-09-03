import React from 'react';
import { connect } from 'react-redux';

import { hideOverlay } from '../../actions/actionOverlay';

import './Map.css';

export class CloseOverlayButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hover: false };
    }

    addHoverCSS() {
        this.setState({ hover: 'hoverSvgOn' });
    }
    
    removeHoverCSS() {
        this.setState({ hover: 'hoverSvgOff' });
    }
    
    render() {
        return (
            <g className={'close-overlay-container ' + 
                    (this.state.hover ? this.state.hover : '')}
                onMouseEnter={() => this.addHoverCSS()}
                onMouseLeave={() => this.removeHoverCSS()}
                onClick={() => this.props.dispatch(hideOverlay())}
            >
                <rect className="close-overlay-button"></rect>
                <text className="close-overlay-text">Back</text>
            </g>
        );
    }
}

export default connect()(CloseOverlayButton);