import React from 'react';
import { connect } from 'react-redux';

import { showHelpModal } from '../../actions/actionInfoModal';

import './Button.css';

export class HelpButton extends React.Component {
    render() {
        return (
            <div className="help info-btn">
                <a href="#" 
                    onClick={() => this.props.dispatch(showHelpModal())}>
                Help
                </a>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    showInfoModal: state.showInfoModal
});

export default connect(mapStateToProps)(HelpButton);