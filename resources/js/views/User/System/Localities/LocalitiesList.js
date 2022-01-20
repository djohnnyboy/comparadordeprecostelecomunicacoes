import {Link, withRouter} from 'react-router-dom';
import React, { Component } from 'react';
import axios from 'axios';
import New from '../../../../components/Buttons/New';

class LocalitiesList extends Component {
    constructor(props){
        super(props)
        this.state = {
            localities: [],
            errors: []
        }
    }

    componentDidMount (){
        axios.post('/api/localities').then(json => {
            this.setState({
                localities: json.data
            })
        }).catch(error => {
            this.setState({
                errors: error.response.data.errors
            })
        })
    }

    onDelete(id){
        axios.delete('/api/locality/' + id)
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
        const { localities, errors } = this.state;
        const margin = {
            marginTop: "200px"
        };     
        return (
            <div className="container" style={margin}>
                <div className="row">
                    <div className="offset-md-4 col-md-8 offset-md-4">
                        <div className="card">
                            <div className="card-header">
                            Localities <New url="create-new-locality" name="Locality"/>
                            </div>
                            <div className="card-body">
                                <ul>
                                   {localities.map(locality => (
                                        <li className="list-group-item text-center p-4" key={locality.id}>
                                            <h5 className="card-title">{locality.name}</h5>
                                            <p className="card-text">{locality.postCode}</p>
                                            <a href="/localities" className="float-right btn btn-danger ml-1 mr-1" onClick={this.onDelete.bind(this, locality.id)}>Delete</a>
                                            <Link to={`/locality/${locality.id}/edit`} className="float-right btn btn-primary mr-2">edit</Link>
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
export default withRouter(LocalitiesList);