import React from 'react';
import { connect } from 'react-redux';

import { showAboutModal } from '../../actions/actionInfoModal';

import './Button.css';

export class AboutButton extends React.Component {
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
            <div className={"about info-btn " + (this.state.hover ? this.state.hover : '')}
                onMouseEnter={() => this.addHoverCSS()}
                onMouseLeave={() => this.removeHoverCSS()}
                onClick={() => this.props.dispatch(showAboutModal())}
            >
                <a href="#">About</a>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    showInfoModal: state.showInfoModal
});

export default connect(mapStateToProps)(AboutButton);