import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';

class LoginContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoggedIn: false,
            access_token: false,
            formSubmitting: false,
            user:{
                email: '',
                password: ''
            },
            errors: [],
            redirect: props.redirect,
        };

        this.hasErrorFor = this.hasErrorFor.bind(this);
        this.renderErrorFor = this.renderErrorFor.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleFieldEmail = this.handleFieldEmail.bind(this);
        this.handleFieldPassword = this.handleFieldPassword.bind(this);
    }


    handleFieldEmail (event){
        let value = event.target.value;
        this.setState(prevState => ({
            user:{
                ...prevState.user, email: value
            }
        }));
    }

    handleFieldPassword (event){
        let value = event.target.value;
        this.setState(prevState => ({
            user:{
                ...prevState.user, password: value
            }
        }));
    }

    componentWillMount() {
        let state = localStorage["appState"];
        if (state) {
        let AppState = JSON.parse(state);
        this.setState({isLoggedIn: AppState.isLoggedIn, user: AppState.user});
        }
        if (this.state.isLoggedIn) {
        return this.props.history.push("/dashboard");
        }
    }
      // 2.3
      componentDidMount() {
        const { prevLocation } = this.state.redirect.state || {prevLocation: { pathname: '/dashboard' } };
        if (this.state.isLoggedIn) {
          return this.props.history.push(prevLocation);
        }
      }

    handleLogin (event){

        event.preventDefault();
        this.setState({formSubmitting: true});
        let userData = this.state.user;
        
        axios.post('/api/auth/login', userData).then(response => {
            return response;
          }).then(response => {
              console.log(response );
             if (response.data.success) {
                let userData = {
                  id: response.data.user.id,
                  name: response.data.user.name,
                  email: response.data.user.email,
                  access_token: response.data.access_token,
                };
                let appState = {
                  isLoggedIn: true,
                  user: userData
                };
                localStorage["appState"] = JSON.stringify(appState);
                this.setState({
                   isLoggedIn: appState.isLoggedIn,
                   user: appState.user,
                   
                });
                location.reload();
              }
              else {
                 alert(`Our System Failed To Register Your Account!`);
              }  
          }).catch(error => {
              if (error.response) {
                    this.setState({
                        errors: error.response.data.errors,
                        formSubmitting: false
                    })
            
            } else if (error.request) {
              // The request was made but no response was received `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js        
  
              let err = error.request;
              this.setState({
                errors: err,
                formSubmitting: false
              })
           } else {
             // Something happened in setting up the request that triggered an Error       
             
             let err = error.message;
             this.setState({
                
                errors: err,
               formSubmitting: false
             })
             
         }
       }).finally(this.setState({error: ''}));

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

    render(){
       
        let { errors } = this.state;
        const margin = {
            marginTop: "200px"
        };  
        console.log(this.state) 
        return(
        <div className="container" style={margin}>
            <div className="row">
                <div className="offset-md-4 col-md-8 offset-md-4">
                <div className="card mt-5">
                    <div className="card-header">
                        <p className="ml-4">Login</p>        
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.handleLogin}>
                            <label htmlFor="email" className="ml-4 text-center">Email</label>
                            <input 
                                className={`ml-4 w-75 form-control ${this.hasErrorFor('email') ? 'is-invalid' : '' }`}
                                type="email"
                                name="email"
                                value={this.state.user.email || ''}
                                onChange={this.handleFieldEmail}
                                />
                                {this.renderErrorFor('email')}
                            <label htmlFor="password" className="ml-4">Password</label>
                            <input 
                                className={`ml-4 w-75 form-control ${this.hasErrorFor('password') ? 'is-invalid' : '' }`} 
                                type="password"
                                name="password"
                                value={this.state.user.password || ''}
                                onChange={this.handleFieldPassword}
                                />
                                {this.renderErrorFor('password')}
                            
                            <div className="form-check">             
                                <input className="form-check-input ml-2" name="remember_me" type="checkbox" id="gridCheck" />
                                <label className="form-check-label ml-4" htmlFor="remember_me">Remember me</label>
                            </div>

                            <button className="btn btn-primary mt-3 ml-4 w-75" type="submit" >Login</button>
                        </form>
                    </div>
                    <div className="card-footer">
                        {errors == 'Unauthorized' && <div className="btn btn-danger ml-4 w-75">{errors} credentials!</div>} 
                    </div>                   
                </div>
            </div>
        </div>
    </div>
                        

        )
    }
}

export default withRouter(LoginContainer);