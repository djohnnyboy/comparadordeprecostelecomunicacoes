import {Link, withRouter} from 'react-router-dom';
import React, { Component } from 'react';
import axios from 'axios';
import Input from '../../../../components/Buttons/Input';

class EditLocality extends Component {
    constructor(props){
        super(props);
        this.state = {
            product: '',
            locality: {
                name: '',
                postCode: '',
            },
            errors: [],
        }
        this.handleFieldName = this.handleFieldName.bind(this);
        this.handleFieldPostCode = this.handleFieldPostCode.bind(this);
        this.hasErrorFor = this.hasErrorFor.bind(this);
        this.renderErrorFor = this.renderErrorFor.bind(this);
        this.handleEditLocality = this.handleEditLocality.bind(this);
    }

    componentDidMount(){
        const localityId = this.props.match.params.id
        axios.post(`/api/locality/${localityId}/edit`)
            .then(response => {
                this.setState({
                    locality: {
                        name: response.data.name,
                        postCode: response.data.postCode,
                    }
                })
            }) 
            .catch(error => {
                this.setState({
                    errors: error.response.data.errors
                })
            })
    }

    handleEditLocality (event){  
        event.preventDefault();
        const locality = {
            name: this.state.locality.name,
            postCode: this.state.locality.postCode,
        }
        
        axios.put(`/api/locality/${this.props.match.params.id}`, locality)
            .then(response => {
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
        console.log(this.state.product)
        return (
            <div className="container" style={margin}>
                <div className="row">
                    <div className="offset-md-4 col-md-8 offset-md-4">
                        
                    <div className="card">
                        <div className="card-header">
                            Edit Locality
                        </div>
                        <div className="card-body">
                            <form onSubmit={this.handleEditLocality}>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input 
                                        id="name"
                                        type="text"
                                        className={`form-control 
                                        ${this.hasErrorFor('name') ? 'is-invalid' : '' }`}
                                        value={this.state.locality.name || ''}
                                        onChange={this.handleFieldName}
                                    />
                                    {this.renderErrorFor('name')}
                                    <label htmlFor="nif">Post Code</label>
                                    <input 
                                        id="postCode"
                                        type="number"
                                        className={`form-control 
                                        ${this.hasErrorFor('postCode') ? 'is-invalid' : '' }`}
                                        value={this.state.locality.postCode || ''}
                                        onChange={this.handleFieldPostCode}
                                    />
                                    {this.renderErrorFor('postCode')}
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
export default withRouter(EditLocality);