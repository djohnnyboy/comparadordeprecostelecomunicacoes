import {Link, withRouter} from 'react-router-dom';
import React, { Component } from 'react';
import axios from 'axios';
import Input from '../../../../components/Buttons/Input';

class AddLocality extends Component {
    constructor(props){
        super(props);
        this.state = {
            products: {},
            locality: {
                name: '',
                postCode: '',
               /*  zona: '',  */
            },
            errors: [],
        }
        this.handleFieldName = this.handleFieldName.bind(this);
        this.handleFieldPostCode = this.handleFieldPostCode.bind(this);
        /* this.handleFieldZona = this.handleFieldZona.bind(this); */

        this.hasErrorFor = this.hasErrorFor.bind(this);
        this.renderErrorFor = this.renderErrorFor.bind(this);
       this.handleNewProduct = this.handleNewProduct.bind(this); 
    }

    componentDidMount (){
        axios.post('/api/products').then(response => {  
            return response;       
          }).then(response => {
            this.setState({
                products: response.data
            });
            })
            .catch(error => {
                this.setState({
                    errors: error.response.data.errors
                });
            });
    }

    handleNewProduct (event){  

        event.preventDefault();

        let state = localStorage["appState"];
        let AppState = [];
        AppState = JSON.parse(state);

        const locality = {
            name: this.state.locality.name,
            postCode: this.state.locality.postCode,
            /* zona: this.state.locality.zona, */
        }
        
        axios.post('/api/localityNew', locality).then(response => {  
            return response;       
          }).then(response => {
                return this.props.history.push("/localities");
            })
            .catch(error => {
                this.setState({
                    errors: error.response.data.errors
                });
            });
    }  

    handleFieldName (event){
        let value = event.target.value;
        this.setState(prevState => ({
            locality: {
                ...prevState.locality, name: value
            }
        }));
    }

    handleFieldPostCode (event){
        let value = event.target.value;
        this.setState(prevState => ({
            locality: {
                ...prevState.locality, postCode: value
            }
        }));
    }

  /*   handleFieldZona (event){
        let value = event.target.value;
        this.setState(prevState => ({
            locality: {
                ...prevState.locality, zona: value
            }
        }));
    } */

    hasErrorFor (field){
        return !!this.state.errors[field];
    }

    renderErrorFor (field){
        if (this.hasErrorFor(field)) {
            return (
                <span className="invalid-feedback">
                    <strong>{this.state.errors[field][0] }</strong>
                </span>
            )
        }    
    }

    render() {
        const margin = {
            marginTop: "200px"
        }; 
        
        return (
            <div className="container" style={margin}>
                <div className="row">
                    <div className="offset-md-4 col-md-8 offset-md-4">
                        <div className="card">
                            <div className="card-header">
                                Create new locality
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.handleNewProduct}>
                                    <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <input 
                                            id="name"
                                            type="text"
                                            name="name"
                                            className={`form-control ${this.hasErrorFor('name') ? 'is-invalid' : '' }`}
                                            value={this.state.locality.name || ''}
                                            onChange={this.handleFieldName}
                                        />
                                        {this.renderErrorFor('name')}
                                        <label htmlFor="postCode">Post Code</label>
                                        <input 
                                            id="postCode"
                                            type="text"
                                            name="postCode"
                                            className={`form-control ${this.hasErrorFor('postCode') ? 'is-invalid' : '' }`}
                                            value={this.state.locality.postCode || ''}
                                            onChange={this.handleFieldPostCode}
                                        />
                                        {this.renderErrorFor('postCode')}
                                       {/*  <label htmlFor="zona">Zona</label>
                                        <input 
                                            id="zona"
                                            type="text"
                                            name="zona"
                                            className={`form-control ${this.hasErrorFor('zona') ? 'is-invalid' : '' }`}
                                            value={this.state.locality.zona || ''}
                                            onChange={this.handleFieldZona}
                                        />
                                        {this.renderErrorFor('zona')} */}
                                        <Input 
                                            type="submit"
                                            text="submit"
                                        />
                                    </div>
                                </form>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
            )
        }
}

export default withRouter(AddLocality);
