import React from 'react';
import { connect } from 'react-redux';

import { showAboutModal } from '../../actions/actionInfoModal';

import './Button.css';

export class AboutButton extends React.Component {
    render() {
        return (
            <div className="about info-btn">
                <a href="#" 
                    onClick={() => this.props.dispatch(showAboutModal())}>
                About
                </a>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    showInfoModal: state.showInfoModal
});

export default connect(mapStateToProps)(AboutButton);