import {Link, withRouter} from 'react-router-dom';
import React, { Component } from 'react';
import axios from 'axios';
import Input from '../../../../components/Buttons/Input';

export default class EditProduct extends Component {
    constructor(props){

        super(props);
        this.state = {
            product: {
                name: '',
                discount: '',
                discountTime: '',
                zoneIn: '',
                channels: '',
                internetGb: '',
                landLine: '',
                connection: '',
                phones0: '',
                phones1: '',
                phones2: '',
                phones3: '',
                phones4: '',
                company_id: ''
            },
            errors: [],
        }
        this.handleFieldName = this.handleFieldName.bind(this);
        this.handleFieldZoneIn = this.handleFieldZoneIn.bind(this);
        this.handleFieldDiscount = this.handleFieldDiscount.bind(this);
        this.handleFieldDiscountTime = this.handleFieldDiscountTime.bind(this);
        this.handleFieldChannels = this.handleFieldChannels.bind(this);
        this.handleFieldInternetGb = this.handleFieldInternetGb.bind(this);
        this.handleFieldLandline = this.handleFieldLandline.bind(this);
        this.handleFieldConnection = this.handleFieldConnection.bind(this);
        this.handleFieldPhones0 = this.handleFieldPhones0.bind(this);
        this.handleFieldPhones1 = this.handleFieldPhones1.bind(this);
        this.handleFieldPhones2 = this.handleFieldPhones2.bind(this);
        this.handleFieldPhones3 = this.handleFieldPhones3.bind(this);
        this.handleFieldPhones4 = this.handleFieldPhones4.bind(this);

        this.hasErrorFor = this.hasErrorFor.bind(this);
        this.renderErrorFor = this.renderErrorFor.bind(this);
        this.handleEditCompany = this.handleEditCompany.bind(this);
    }

    componentDidMount(){
        const productId = this.props.match.params.id
        axios.post(`/api/product/${productId}/edit`)
            .then(response => {
                this.setState({
                    product: {
                        name: response.data.name,
                        discount: response.data.discount,
                        zoneIn: response.data.zoneIn,
                        discountTime: response.data.discountTime,
                        channels: response.data.channels,
                        internetGb: response.data.internetGb,
                        landLine: response.data.landLine,
                        connection: response.data.connection,
                        phones0: response.data.phones0,
                        phones1: response.data.phones1,
                        phones2: response.data.phones2,
                        phones3: response.data.phones3,
                        phones4: response.data.phones4,
                        company_id:  response.data.company_id
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
        const product = {
            name: this.state.product.name,
            discount: this.state.product.discount,
            discountTime: this.state.product.discountTime,
            channels: this.state.product.channels,
            zoneIn: this.state.product.zoneIn,
            internetGb: this.state.product.internetGb,
            landLine: this.state.product.landLine,
            connection: this.state.product.connection,
            phones0: this.state.product.phones0,
            phones1: this.state.product.phones1,
            phones2: this.state.product.phones2,
            phones3: this.state.product.phones3,
            phones4: this.state.product.phones4,
            company_id: this.state.product.company_id,
        }
        
        axios.put(`/api/product/${this.props.match.params.id}`, product)
            .then(response => {
                return this.props.history.push("/products");
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
            product: {
                ...prevState.product, company_id: value
            }
        }));
    }

    handleFieldName (event){
        let value = event.target.value;
        this.setState(prevState => ({
            product: {
                ...prevState.product, name: value
            }
        }));
    }

    handleFieldZoneIn (event){
        let value = event.target.value;
        this.setState(prevState => ({
            product: {
                ...prevState.product, zoneIn: value
            }
        }));
    }

    handleFieldDiscount (event){
        let value = event.target.value;
        this.setState(prevState => ({
            product: {
                ...prevState.product, discount: value
            }
        }));
    }

    handleFieldDiscountTime (event){
        let value = event.target.value;
        this.setState(prevState => ({
            product: {
                ...prevState.product, discountTime: value
            }
        }));
    }

    handleFieldChannels (event){
        let value = event.target.value;
        this.setState(prevState => ({
            product: {
                ...prevState.product, channels: value
            }
        }));
    }

    handleFieldInternetGb (event){
        let value = event.target.value;
        this.setState(prevState => ({
            product: {
                ...prevState.product, internetGb: value
            }
        }));
    }

    handleFieldLandline (event){
        let value = event.target.value;
        this.setState(prevState => ({
            product: {
                ...prevState.product, landLine: value
            }
        }));
    }

    handleFieldConnection (event){
        let value = event.target.value;
        this.setState(prevState => ({
            product: {
                ...prevState.product, connection: value
            }
        }));
    }

    handleFieldPhones0 (event){
        let value = event.target.value;
        this.setState(prevState => ({
            product: {
                ...prevState.product, phones0: value
            }
        }));
    }
    
    handleFieldPhones1 (event){
        let value = event.target.value;
        this.setState(prevState => ({
            product: {
                ...prevState.product, phones1: value
            }
        }));
    }

    handleFieldPhones2 (event){
        let value = event.target.value;
        this.setState(prevState => ({
            product: {
                ...prevState.product, phones2: value
            }
        }));
    }

    handleFieldPhones3 (event){
        let value = event.target.value;
        this.setState(prevState => ({
            product: {
                ...prevState.product, phones3: value
            }
        }));
    }
    handleFieldPhones4 (event){
        let value = event.target.value;
        this.setState(prevState => ({
            product: {
                ...prevState.product, phones4: value
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

        let discountTime = [];
        for (let index = 0; index < 25; index++) {
            if (this.state.product.discountTime === index) {
                discountTime.push(<option key={index} selected>{index}</option>)
            }else{
                discountTime.push(<option key={index}>{index}</option>) 
            }
        } 

        let zoneIn = [];
        
        for (let j = 0; j < 2; j++) {
            if (this.state.product.zoneIn === 0) {
                zoneIn.push(<option key={j} value={j} selected>{j}</option>);
            }else{
                zoneIn.push(<option key={j} value={j}>{j}</option>);
            }   
            
            
        }
        console.log(this.state)
        return (
            <div className="container" style={margin}>
                <div className="row">
                    <div className="offset-md-4 col-md-8 offset-md-4">
                        
                    <div className="card">
                        <div className="card-header">
                            Edit Product 
                        </div>
                        <div className="card-body">
                            <form onSubmit={this.handleEditCompany}>
                                <div className="form-group">
                                    <label htmlFor="companies_id">Companies</label>
                                    
                                    {this.renderErrorFor('name')}
                                    <label htmlFor="name">Name</label>
                                    <input 
                                        id="name"
                                        type="text"
                                        className={`form-control ${this.hasErrorFor('name') ? 'is-invalid' : '' }`}
                                        value={this.state.product.name || ''}
                                        onChange={this.handleFieldName}
                                    />
                                    {this.renderErrorFor('name')}

                                    <label htmlFor="discount">Discount</label>
                                    <input 
                                        id="discount"
                                        type="text"
                                        name="discount"
                                        className={`form-control ${this.hasErrorFor('discount') ? 'is-invalid' : '' }`}
                                        value={this.state.product.discount || ''}
                                        onChange={this.handleFieldDiscount}
                                    />
                                    {this.renderErrorFor('discount')}

                                    <label htmlFor="discountTime">Discount Time</label>
                                    <select name="discountTime" 
                                            className="form-control" 
                                            id="discountTime" 
                                            onChange={this.handleFieldDiscountTime}>          
                                        {discountTime}
                                    </select>
                                    {this.renderErrorFor('discountTime')}

                                    <label htmlFor="zoneIn">Zone In</label>
                                    <select 
                                        className="form-control"
                                        name="zoneIn"
                                        id="zoneIn"
                                        value={this.state.product.zoneIn || ''}
                                        onChange={this.handleFieldZoneIn}>
                                        {zoneIn}
                                    </select>
                                    {this.renderErrorFor('zoneIn')}

                                    <label htmlFor="agent">Channels</label>
                                    <input 
                                        id="channels"
                                        type="number"
                                        className={`form-control ${this.hasErrorFor('channels') ? 'is-invalid' : '' }`}
                                        value={this.state.product.channels || ''}
                                        onChange={this.handleFieldChannels}
                                    />
                                    {this.renderErrorFor('channels')}
                                    <label htmlFor="landLine">Landline</label>
                                    <input 
                                        id="landline"
                                        type="text"
                                        className={`form-control ${this.hasErrorFor('landLine') ? 'is-invalid' : '' }`}
                                        value={this.state.product.landLine || ''}
                                        onChange={this.handleFieldLandline}
                                    />
                                    {this.renderErrorFor('landLine')}
                                    <label htmlFor="internetGb">InternetGb</label>
                                        <input 
                                            id="internetGb"
                                            type="numeric"
                                            name="internetGb"
                                            className={`form-control ${this.hasErrorFor('internetGb') ? 'is-invalid' : '' }`}
                                            value={this.state.product.internetGb || ''}
                                            onChange={this.handleFieldInternetGb}
                                        />
                                        {this.renderErrorFor('internetGb')}
                                    <label htmlFor="connection">Connection</label>
                                    <input 
                                        id="connection"
                                        type="text"
                                        className={`form-control ${this.hasErrorFor('connection') ? 'is-invalid' : '' }`}
                                        value={this.state.product.connection || ''}
                                        onChange={this.handleFieldConnection}
                                    />
                                    {this.renderErrorFor('connection')}
                                    <label htmlFor="phones0">Phones 0</label>
                                        <input 
                                            id="phones0"
                                            type="text"
                                            name="phones0"
                                            className={`form-control ${this.hasErrorFor('phones0') ? 'is-invalid' : '' }`}
                                            value={this.state.product.phones0 || ''}
                                            onChange={this.handleFieldPhones0}
                                        />
                                        {this.renderErrorFor('phones0')}
                                    <label htmlFor="phones1">Phones 1</label>
                                        <input 
                                            id="phones1"
                                            type="text"
                                            name="phones1"
                                            className={`form-control ${this.hasErrorFor('phones1') ? 'is-invalid' : '' }`}
                                            value={this.state.product.phones1 || ''}
                                            onChange={this.handleFieldPhones1}
                                        />
                                        {this.renderErrorFor('phones1')}
                                        <label htmlFor="phones2">Phones 2</label>
                                        <input 
                                            id="phones2"
                                            type="text"
                                            name="phones2"
                                            className={`form-control ${this.hasErrorFor('phones2') ? 'is-invalid' : '' }`}
                                            value={this.state.product.phones2 || ''}
                                            onChange={this.handleFieldPhones2}
                                        />
                                        {this.renderErrorFor('phones2')}  
                                        <label htmlFor="phones3">Phones 3</label>
                                        <input 
                                            id="phones3"
                                            type="text"
                                            name="phones3"
                                            className={`form-control ${this.hasErrorFor('phones3') ? 'is-invalid' : '' }`}
                                            value={this.state.product.phones3 || ''}
                                            onChange={this.handleFieldPhones3}
                                        />
                                        {this.renderErrorFor('phones3')}   
                                        <label htmlFor="phones4">Phones 4</label>
                                        <input 
                                            id="phones4"
                                            type="text"
                                            name="phones4"
                                            className={`form-control ${this.hasErrorFor('phones4') ? 'is-invalid' : '' }`}
                                            value={this.state.product.phones4 || ''}
                                            onChange={this.handleFieldPhones4}
                                        />
                                        {this.renderErrorFor('phones4')}    
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
