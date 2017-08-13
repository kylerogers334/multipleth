import React from 'react';
import { connect } from 'react-redux';

export class AboutModal extends React.Component {
    render() {
        return (
            <div className="modal-container">
                ABOUT
            </div>
        );
    }
}

const mapStateToProps = state => ({
    showInfoModal: state.showInfoModal
});

export default connect(mapStateToProps)(AboutModal);