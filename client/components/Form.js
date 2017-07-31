import React from 'react';
import {connect} from 'react-redux';

export class Form extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <form>
            
            </form>
        );
    }
}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(Form);