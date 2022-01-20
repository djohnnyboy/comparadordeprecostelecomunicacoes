import React, { Component } from 'react';
import RegisterContainer from './RegisterContainer';
import {withRouter} from "react-router-dom";

class Register extends Component {
    
    render() {
        return (
            <div className="content">
                <RegisterContainer />
            </div>
        )
    }
}
export default withRouter(Register)