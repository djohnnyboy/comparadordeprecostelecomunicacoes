import {Link, withRouter} from 'react-router-dom';
import React, { Component } from 'react';
import axios from 'axios';
import Input from '../../../../components/Buttons/Input';

class EditCompany extends Component {
    constructor(props){

        super(props);
        this.state = {
            company: {
                name: '',
                nif: '',
                agent: '',
                phone: '',
            },
            errors: [],
        }
        this.handleFieldName = this.handleFieldName.bind(this);
        this.handleFieldNif = this.handleFieldNif.bind(this);
        this.handleFieldAgent = this.handleFieldAgent.bind(this);
        this.handleFieldPhone = this.handleFieldPhone.bind(this);

        this.hasErrorFor = this.hasErrorFor.bind(this);
        this.renderErrorFor = this.renderErrorFor.bind(this);
        this.handleEditCompany = this.handleEditCompany.bind(this);
    }

    componentDidMount(){
        const companyId = this.props.match.params.id
        axios.post(`/api/company/${companyId}/edit`)
            .then(response => {
                console.log(response);
                this.setState({
                    company: {
                        name: response.data.name,
                        nif: response.data.nif,
                        agent: response.data.agent,
                        phone: response.data.phone,
                    }
                })
            }) 
            .catch(error => {
                this.setState({
                    errors: error.response.data.errors
                })
            })  
    }

    handleEditCompany (event){  
        event.preventDefault();
        const company = {
            name: this.state.company.name,
            nif: this.state.company.nif,
            agent: this.state.company.agent,
            phone: this.state.company.phone,
        }
        
        axios.put(`/api/company/${this.props.match.params.id}`, company)
            .then(response => {
                return this.props.history.push("/companies");
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
            company: {
                ...prevState.company, name: value
            }
        }));
    }

    handleFieldNif (event){
        let value = event.target.value;
        this.setState(prevState => ({
            company: {
                ...prevState.company, nif: value
            }
        }));
    }
    
    handleFieldAgent (event){
        let value = event.target.value;
        this.setState(prevState => ({
            company: {
                ...prevState.company, agent: value
            }
        }));
    }

    handleFieldPhone (event){
        let value = event.target.value;
        this.setState(prevState => ({
            company: {
                ...prevState.company, phone: value
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
        return (
            <div className="container" style={margin}>
                <div className="row">
                    <div className="offset-md-4 col-md-8 offset-md-4">
                        
                    <div className="card">
                        <div className="card-header">
                            Edit Company
                        </div>
                        <div className="card-body">
                            <form onSubmit={this.handleEditCompany}>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input 
                                        id="name"
                                        type="text"
                                        className={`form-control ${this.hasErrorFor('name') ? 'is-invalid' : '' }`}
                                        value={this.state.company.name || ''}
                                        onChange={this.handleFieldName}
                                    />
                                    {this.renderErrorFor('name')}
                                    <label htmlFor="nif">Nif</label>
                                    <input 
                                        id="nif"
                                        type="number"
                                        className={`form-control ${this.hasErrorFor('nif') ? 'is-invalid' : '' }`}
                                        value={this.state.company.nif || ''}
                                        onChange={this.handleFieldNif}
                                    />
                                    {this.renderErrorFor('nif')}
                                    <label htmlFor="agent">Agent</label>
                                    <input 
                                        id="agent"
                                        type="text"
                                        className={`form-control ${this.hasErrorFor('agent') ? 'is-invalid' : '' }`}
                                        value={this.state.company.agent || ''}
                                        onChange={this.handleFieldAgent}
                                    />
                                    {this.renderErrorFor('agent')}
                                    <label htmlFor="phone">Phone</label>
                                    <input 
                                        id="phone"
                                        type="tel"
                                        className={`form-control ${this.hasErrorFor('phone') ? 'is-invalid' : '' }`}
                                        value={this.state.company.phone || ''}
                                        onChange={this.handleFieldPhone}
                                    />
                                    {this.renderErrorFor('phone')}
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
export default withRouter(EditCompany);