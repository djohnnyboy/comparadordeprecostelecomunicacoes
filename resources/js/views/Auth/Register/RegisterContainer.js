import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';

class RegisterContainer extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            isLoggedIn: false,
            isRegistered: false,
            access_token: false,
            formSubmitting: false,
            errors: [],
            user: {
                name: '',
                email: '',
                password: '',
                password_confirmation: ''
            },  
        };

        this.hasErrorFor = this.hasErrorFor.bind(this)
        this.renderErrorFor = this.renderErrorFor.bind(this)
        this.handleNewRegister = this.handleNewRegister.bind(this);

        this.handleFieldName = this.handleFieldName.bind(this);
        this.handleFieldEmail = this.handleFieldEmail.bind(this);
        this.handleFieldPassword = this.handleFieldPassword.bind(this);
        this.handleFieldConfirmPassword = this.handleFieldConfirmPassword.bind(this);
    }

componentWillMount() {
    let state = localStorage["appState"];
    if (state) {
    let AppState = JSON.parse(state);
    this.setState({isLoggedIn: AppState.isLoggedIn, user: AppState.user});
    }
    if (this.state.isRegistered) {
    return this.props.history.push("/dashboard");
    }
}
  // 2.3
  componentDidMount() {
    const { prevLocation } = {prevLocation: { pathname: '/dashboard' } };
    if (this.state.isLoggedIn) {
      return this.props.history.push(prevLocation);
    }
  }

    handleNewRegister (event){
        event.preventDefault();    
        this.setState({formSubmitting: true});
        let userData = this.state.user;
        axios.post('/api/auth/register', userData)
            .then(response => {
                if (response.data.success) {
                    console.log('email :' + response.data.user.email);
                    
                    let userData = {
                        id: response.data.user.id,
                        name: response.data.user.name,
                        email: response.data.user.email,
                        password: response.data.user.password
                    };
                    console.log('userData: ' + response.data.user.id);
                    let appState = { 
                        isLoggedIn: true,
                        access_token: response.data.access_token,
                        user: userData
                    };
                    localStorage['appState'] = JSON.stringify(appState);
                    this.setState({
                        isRegistered: true,
                        isLoggedIn: appState.isLoggedIn,
                        access_token: appState.access_token,
                        user: appState.user,
                        errors: ''
                    });
                    location.reload();
                }else{
                    errors[0] = 'our system Failed To Register Your Account!';
                }
            }).catch(error => {
                if (error.response) {
                    console.log(error);
               
                    this.setState({
                        errors: error.response.data.errors,
                        formSubmitting: false
                    })
                }else if (error.request) {
                    // The request was made but no response was received `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
                    
                    this.setState({
                        errors: error.request,
                        formSubmitting: false
                    })

                }else{
                    this.setState({
                        errors: error.message,
                        formSubmitting: false
                    })
                }      
            }).finally(this.setState({error: ' ' }));       
    }

    handleFieldName (event){
        console.log(event.target.value);
        let value = event.target.value; 
        
        this.setState(prevState => ({
            user: {
                ...prevState.user, name: value
            }
        }));
    }
    handleFieldEmail (event){
        console.log(event.target.value);
        let value = event.target.value; 
        
        this.setState(prevState => ({
            user: {
                ...prevState.user, email: value
            }
        }));
    }

    handleFieldPassword (event){
        console.log(event.target.value);
        let value = event.target.value; 
        
        this.setState(prevState => ({
            user: {
                ...prevState.user, password: value
            }
        }));
    }

    handleFieldConfirmPassword (event){
        console.log(event.target.value);
        let value = event.target.value; 
        
        this.setState(prevState => ({
            user: {
                ...prevState.user, password_confirmation: value
            }
        }));
    }

    hasErrorFor (field){
        return !!this.state.errors[field];
    }

    renderErrorFor (field){
        if (this.hasErrorFor(field)) {
            return(
                <span className="invalid-feedback ml-4">
                    <strong>{this.state.errors[field][0]}</strong>
                </span>
            )
        }
    }

    render () {
    const margin = {
        marginTop: "200px"
    };   
    return (  
    <div className="container" style={margin}>
        <div className="row">
            <div className="offset-md-4 col-md-8 offset-md-4">
                <div className="card mt-5">
                    <div className="card-header">
                    <p className="ml-4">Register</p>
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.handleNewRegister}>
                            <label htmlFor="name" className="ml-4">Name</label>
                            <input 
                                type="text"
                                name="name"
                                className={`ml-4 w-75 form-control ${this.hasErrorFor('name') ? 'is-invalid' : '' }`}
                                value={this.state.user.name || ''}
                                onChange={this.handleFieldName}
                            />
                            {this.renderErrorFor('name')}
                            <label htmlFor="email" className="ml-4">Email</label>
                            <input 
                                type="email"
                                name="email"
                                className={`ml-4 w-75 form-control ${this.hasErrorFor('email') ? 'is-invalid' : '' }`}
                                value={this.state.user.email || ''}
                                onChange={this.handleFieldEmail}
                            />
                            {this.renderErrorFor('email')}
                            <label htmlFor="password" className="ml-4">Password</label>
                            <input 
                                type="password"
                                name="password"
                                className={`ml-4 w-75 form-control ${this.hasErrorFor('password') ? 'is-invalid' : '' }`}
                                value={this.state.user.password || ''}
                                onChange={this.handleFieldPassword}
                            />
                            {this.renderErrorFor('password')}
                            <label htmlFor="password_confirmation" className="ml-4">Confirm Password</label>
                            <input 
                                type="password"
                                name="password_confirmation"
                                className={`ml-4 w-75 form-control ${this.hasErrorFor('confirmPassword') ? 'is-invalid' : '' }`}
                                value={this.state.user.password_confirmation || ''}
                                onChange={this.handleFieldConfirmPassword}
                            />
                            {this.renderErrorFor('confirmPassword')}
                            <input className="btn btn-danger mt-3 ml-4 w-75" type="submit" value="Register" />
                        </form>
                    </div>
                    <div className="card-footer"></div>
                </div>
            </div>
        </div>
    </div>
            
        )   
    }
}

export default withRouter(RegisterContainer);
