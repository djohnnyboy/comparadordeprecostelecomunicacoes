import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            user: {}
        }
    }

    componentWillMount() {
        let state = localStorage["appState"];
        if (state) {
        let AppState = JSON.parse(state);
            this.setState({isLoggedIn: AppState.isLoggedIn,user: AppState.user});
        }
    }
    
    render() {
        const margin = {
            marginTop: "200px"
        }; 
        return (
            <div className="container" style={margin}>
                <div className="row">
                    <div className="offset-md-3 col-md-3 offset-md-3">
                        <h1>Dashboard</h1>
                        <table className="table table-striped">
                            <tbody>
                                <tr>
                                    <th scope="row">User Id</th>
                                    <td>{this.state.user.id}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Full Name</th>
                                    <td>{this.state.user.name}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Email</th>
                                    <td>{this.state.user.email}</td>
                                </tr>
                            </tbody>
                        </table>  
                    </div>
                </div>
            </div>
            
        )
    }
}

export default withRouter(Dashboard);
