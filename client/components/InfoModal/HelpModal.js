import React from 'react';
import { connect } from 'react-redux';
import { hideModal } from '../../actions/actionInfoModal.js';

import './Modal.css';

export class HelpModal extends React.Component {
    render() {
        return (
            <div className="modal-container">
                <div className="content">
                    <div className="close-button">
                        <a href="#" onClick={() => this.props.dispatch(hideModal())}>
                            <i className="close-icon"></i>
                        </a>
                    </div>
                    <h3 className="modal-title">Help</h3>
                    <div className="text-container">
                        <p>The purpose of this app is to view several datasets about the United States in a visual and colorful way.</p>
                        <p>Select something you'd like to know about the US from the bottom and it will display the data for each state.</p>
                        <p>If you want to know more about a specific state, click on it!</p>
                        <p>Mouseover an area to see the name of that area.</p>
                        <p>You can even change the display color.</p>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    showInfoModal: state.showInfoModal
});

export default connect(mapStateToProps)(HelpModal);