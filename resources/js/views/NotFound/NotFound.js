import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';

class NotFound extends Component {
    render() {
        return (
            <div>
                <h1 className="text-center mt-5">404 page not found!</h1>
            </div>
        )
    }
}

export default withRouter(NotFound);