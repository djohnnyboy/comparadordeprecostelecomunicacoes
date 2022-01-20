import {Link, withRouter} from 'react-router-dom';
import React, { Component } from 'react';
import axios from 'axios';
import New from '../../../../components/Buttons/New';

class CompaniesList extends Component {
    constructor(props){
        super(props)
        this.state = {
            companies: [],
            errors: [],
        }
    }

    componentDidMount (){
        axios.post('/api/companies').then(json => {
            this.setState({
                companies: json.data
            })
        }).catch(error => {
            this.setState({
                errors: error.response.data.errors
            })
        })
    }

    onDelete(id){
        axios.delete('/api/company/' + id)
            .then(response => {
                location.reload();
            })
            .catch(error => {
                this.setState({
                    errors: error.response.errors
                })
            })
            
    }
    render() {
        const { companies, errors } = this.state;
        const margin = {
            marginTop: "200px"
        };     
        return (
            <div className="container" style={margin}>
                <div className="row">
                    <div className="offset-md-4 col-md-8 offset-md-4">
                        <div className="card">
                            <div className="card-header">
                                Companies <New url="create-new-company" name="Company"/>
                            </div>
                            <div className="card-body">
                                <ul>
                                   {companies.map(company => (
                                        <li className="list-group-item text-center p-4" key={company.id}>
                                            <h5 className="card-title">{company.name}</h5>
                                            <p className="card-text">{company.agent}</p>
                                            <a href="/companies" className="float-right btn btn-danger ml-1 mr-1" onClick={this.onDelete.bind(this, company.id)}>Delete</a>
                                            <Link to={`/company/${company.id}/edit`} className="float-right btn btn-primary mr-2">edit</Link>
                                        </li>
                                    ))}  
                                </ul> 
                            </div>
                        </div>  
                        <div className="card-footer">
                            <ul>
                                {errors.map(error => (
                                    <li key={company.id} className="list-group-item text-center">{error}</li>
                                ))} 
                            </ul>
                        </div>  
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(CompaniesList);