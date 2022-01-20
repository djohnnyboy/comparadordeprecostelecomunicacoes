import {Link, withRouter} from 'react-router-dom';
import React, { Component } from 'react';
import axios from 'axios';
import New from '../../../../components/Buttons/New';

export default class ProductsList extends Component {
    constructor(props){
        super(props)
        this.state = {
            products: [],
            errors: []
        }
    }

    componentDidMount (){
        axios.post('/api/products').then(json => {
            this.setState({
                products: json.data.products
            })
        }).catch(error => {
            this.setState({
                errors: error.response.data.errors
            })
        })
    }

    onDelete(id){
        axios.delete('/api/product/' + id)
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
        const { products, errors } = this.state;
        const margin = {
            marginTop: "200px"
        };    
        return (
            <div className="container" style={margin}>
                <div className="row">
                    <div className="offset-md-4 col-md-8 offset-md-4">
                        <div className="card">
                            <div className="card-header">
                                Products <New url="create-new-product" name="Product"/>
                            </div>
                            <div className="card-body">
                                 <ul>
                                   {products.map(product => (
                                        <li className="list-group-item text-center p-4" key={product.id}>
                                            <h5 className="card-title">{product.companyName} {product.name}</h5>
                                            <p className="card-text">{product.agent}</p>
                                            <a href="/products" className="float-right btn btn-danger ml-1 mr-1" onClick={this.onDelete.bind(this, product.id)}>Delete</a>
                                            <Link to={`/product/${product.id}/edit`} className="float-right btn btn-primary mr-2">edit</Link>
                                        </li>
                                    ))}  
                                </ul>  
                            </div>
                        </div>  
                        <div className="card-footer">
                             <ul>
                                {errors.map(error => (
                                    <li key={product.id} className="list-group-item text-center">{error}</li>
                                ))} 
                            </ul> 
                        </div>  
                    </div>
                </div>
            </div>
        )
    }
}
