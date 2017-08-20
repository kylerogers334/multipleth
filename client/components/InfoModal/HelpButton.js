import React from 'react';
import { connect } from 'react-redux';

import { showHelpModal } from '../../actions/actionInfoModal';

import './Button.css';

export class HelpButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {hover: false};
    }

    addHoverCSS() {
        this.setState({hover: 'hoverOn'});
    }
    
    removeHoverCSS() {
        this.setState({hover: 'hoverOff'});
    }
    
    render() {
        return (
            <div className={"help info-btn " + (this.state.hover ? this.state.hover : '')}
                onMouseEnter={() => this.addHoverCSS()}
                onMouseLeave={() => this.removeHoverCSS()}
                onClick={() => this.props.dispatch(showHelpModal())}
            >
                <a href="#">Help</a>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    showInfoModal: state.showInfoModal
});

export default connect(mapStateToProps)(HelpButton);