import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import Input from '../Buttons/Input';

export default class Query extends Component {
    constructor(props){
        super(props)
        this.state = {
            coverage: false,
        };
    }
    
    render() { 
        console.log(this.props.result)
        const margin = {
            marginTop: "50px",
        };
        const { products } = this.state;
        
        return (
            <div>
                {this.props.result.length > 0 ?      
                this.props.result.map(product => (
                    <div className="container" style={margin} key={product.id}>
                        <div className="card  border mb-1">
                            <div className="row">
                                <div className="offset-md-2 col-md-6">
                                    {product.company_id == 1 && <img src="images/meo.png" className="img-fluid img-thumbnail rounded-start" alt="meo" />}
                                    {product.company_id == 2 && <img src="images/nowo.png" className="img-fluid img-thumbnail rounded-start" alt="nowo" />}
                                    {product.company_id == 3 && <img src="images/nos.png" className="img-fluid img-thumbnail rounded-start" alt="nos" />}
                                    {product.company_id == 4 && <img src="images/vodafone.png" className="img-fluid img-thumbnail rounded-start" alt="vodafone" />}
                                </div>
                                <div className="col-md-4 card-body">
                                    <div className="card-body" key={product.id}>    
                                        <h5 className="card-title">{product.name}</h5> 
                                        <p className="card-text">Canais: {product.channels} TV</p>
                                        <p className="card-text">Internet casa: {product.internetGb} GB</p>
                                        <p className="card-text">Telefone casa: <small>{product.landLine}</small></p>
                                        {this.props.values.phones == 0 && <p className="card-text">Preço: {product.phones0}</p>}
                                        <p>Desconto de {product.discount}€ durante {product.discountTime} meses.</p>
                                        {this.props.values.phones == 1 && <p className="card-text">1 cartao movel<br/> Preço: {product.phones1}</p>}
                                        {this.props.values.phones == 2 && <p className="card-text">2 cartoes movel<br/> Preço: {product.phones2}</p>}
                                        {this.props.values.phones == 3 && <p className="card-text">3 cartoes movel<br/> Preço: {product.phones3}</p>}
                                        {this.props.values.phones == 4 && <p className="card-text">4 cartoes movel<br/> Preço: {product.phones4}</p>}
                                        <p><button onClick={this.props.messageContact} className="btn btn-danger">Obter Oferta</button></p>
                                    </div>
                                </div> 
                            </div>
                        </div>
                </div>
            ))      
            : <div className="container"> 
                <div className="jumbotron" style={margin}>
                    <h1 className="display-4">Desculpe !!!</h1>
                    <p className="lead">A sua query não teve resultados, SFF tente alterar os valores dos canais de Tv ou velocidade da internet..</p>
                    <hr className="my-4"/>
                    <p>Obrigado.</p>
                    <input type="submit" onClick={this.props.handler} className="btn btn-primary btn-lg" value="back"/>
                </div>
            </div>
            } 
            <input type="submit" onClick={this.props.handler} className="btn btn-primary w-100 mt-5" value="back"/>
            </div>
        )
    }
}