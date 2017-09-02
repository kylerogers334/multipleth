import React from 'react';
import { connect } from 'react-redux';

import { hideModal } from '../../actions/actionInfoModal';

import './Modal.css';

export class AboutModal extends React.Component {
    render() {
        return (
            <div className="modal-container">
                <div className="content">
                    <div className="close-button">
                        <a href="#" onClick={() => this.props.dispatch(hideModal())}>
                            <i className="close-icon"></i>
                        </a>
                    </div>
                    <h3 className="modal-title">About</h3>
                    <div className="text-container">
                        <p>Thank you for visiting Multipleth!</p>
                        <p>If you are unsure how to use this app, please click on help button on the top left.</p>
                        <p>The name is derived from multiple + choropleth, which is a 
                         map whose areas are shaded and/or proportioned to a dataset.</p>
                        <p>Data is taken from the <span>  </span>
                            <a target="_blank" href="https://factfinder.census.gov/faces/nav/jsf/pages/index.xhtml">Census Bureau</a>.
                        </p>
                        <p>Curious how this was made? Check out the source code<span>  </span>
                            <a target="_blank" href="https://github.com/kylerogers334/multipleth">
                                here!
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    showInfoModal: state.showInfoModal
    // showInfoModal: state.showInfoModal
});

export default connect(mapStateToProps)(AboutModal);