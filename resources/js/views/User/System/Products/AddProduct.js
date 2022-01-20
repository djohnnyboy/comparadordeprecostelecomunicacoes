import {Link, withRouter} from 'react-router-dom';
import React, { Component } from 'react';
import axios from 'axios';
import Input from '../../../../components/Buttons/Input';
export default class AddProduct extends Component {
    constructor(props){
        super(props);
        this.state = {
            companies:[],
            product: {
                discount: '',
                discountTime: '',
                zoneIn: '',
                name: '',
                channels: '',
                internetGb: '',
                landLine: '',
                phones0: '',
                phones1: '',
                phones2: '',
                phones3: '',
                phones4: '',
                connection: '',
                companyName: '',
                company_id:''
            },
            errors: [],
        }
        this.handleFieldDiscount = this.handleFieldDiscount.bind(this);
        this.handleFieldDiscountTime = this.handleFieldDiscountTime.bind(this);
        this.handleFieldZoneIn = this.handleFieldZoneIn.bind(this);
        this.handleFieldName = this.handleFieldName.bind(this);
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
       this.handleNewProduct = this.handleNewProduct.bind(this); 
    }

    componentDidMount (){
      
        axios.post('/api/companies').then(response => {  
            return response;       
          }).then(response => {
            this.setState({
                companies: response.data
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
        const product = {
            discount: this.state.product.discount,
            discountTime: this.state.product.discountTime,
            name: this.state.product.name,
            zoneIn: this.state.product.zoneIn,
            channels: this.state.product.channels,
            internetGb: this.state.product.internetGb,
            landLine: this.state.product.landLine,
            connection: this.state.product.connection,
            phones0: this.state.product.phones0,
            phones1: this.state.product.phones1,
            phones2: this.state.product.phones2,
            phones3: this.state.product.phones3,
            phones4: this.state.product.phones4,
            companyName: document.getElementById('companies').innerText,
            company_id: document.getElementById('companies').value,
        }
        axios.post('/api/productNew', product).then(response => {  
            return response;       
          }).then(response => {
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

    handleFieldCompany (event){
        let value = event.target.value;
        this.setState(prevState => ({
            product: {
                ...prevState.product, companyName: value
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
        const { companies } = this.state;
        let companiesList = companies.length > 0 
            && companies.map((company, i) => {
                return (
                <option key={i} value={company.id}>{company.name}</option>
                )
            })
            
        return (
            <div className="container" style={margin}>
                <div className="row">
                    <div className="offset-md-4 col-md-8 offset-md-4">
                        <div className="card">
                            <div className="card-header">
                                Create new Product
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.handleNewProduct}>
                                    <div className="form-group">
                                        <label htmlFor="companies">Companies</label>
                                        <select name="companies" 
                                        className="form-control" id="companies" 
                                        onChange={this.handleFieldCompany}>
                                          {companiesList} 
                                        </select>
                                        {this.renderErrorFor('companies')}

                                        <label htmlFor="discount">Discount</label>
                                        <input 
                                            id="discount"
                                            type="text"
                                            name="discount"
                                            className={`form-control 
                                                ${this.hasErrorFor('discount') ? 'is-invalid' : '' }`}
                                            value={this.state.product.discount || ''}
                                            onChange={this.handleFieldDiscount}
                                        />
                                        
                                        {this.renderErrorFor('discount')}
                                        <label htmlFor="discountTime">Discount Time</label>
                                        <select name="discount" className="form-control" id="discountTime" onChange={this.handleFieldDiscountTime}>
                                        <option>Escolha...</option>
                                        <option value="0">0</option> 
                                        <option value="1">1</option>    
                                        <option value="2">2</option>  
                                        <option value="3">3</option>  
                                        <option value="4">4</option>  
                                        <option value="5">5</option>  
                                        <option value="6">6</option>  
                                        <option value="7">7</option>  
                                        <option value="8">8</option>  
                                        <option value="9">9</option>  
                                        <option value="10">10</option>  
                                        <option value="11">11</option>  
                                        <option value="12">12</option>  
                                        <option value="13">13</option>    
                                        <option value="14">14</option>  
                                        <option value="15">15</option>  
                                        <option value="16">16</option>  
                                        <option value="17">17</option>  
                                        <option value="18">18</option>  
                                        <option value="19">19</option>  
                                        <option value="20">20</option>  
                                        <option value="21">21</option>  
                                        <option value="22">22</option>  
                                        <option value="23">23</option>  
                                        <option value="24">24</option>    
                                        </select>
                                        {this.renderErrorFor('discount')}

                                        <label htmlFor="zoneIn">Zone In</label>
                                        <select className="form-control" onChange={this.handleFieldZoneIn}>
                                            <option defaultValue>Escolha...</option>
                                            <option value="0">False</option>
                                            <option value="1">True</option>
                                        </select>
                                        {this.renderErrorFor('zoneIn')}
                                        <label htmlFor="name">Name</label>
                                        <input 
                                            id="name"
                                            type="text"
                                            name="name"
                                            className={`form-control ${this.hasErrorFor('name') ? 'is-invalid' : '' }`}
                                            value={this.state.product.name || ''}
                                            onChange={this.handleFieldName}
                                        />
                                        {this.renderErrorFor('name')}
                                        <label htmlFor="channels">Channels number</label>
                                        <input 
                                            id="channels"
                                            type="numeric"
                                            name="channels"
                                            className={`form-control ${this.hasErrorFor('channels') ? 'is-invalid' : '' }`}
                                            value={this.state.product.channels || ''}
                                            onChange={this.handleFieldChannels}
                                        />
                                        {this.renderErrorFor('channels')}
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
                                        <label htmlFor="landline">Landline</label>
                                        <input 
                                            id="landline"
                                            type="string"
                                            name="landline"
                                            className={`form-control ${this.hasErrorFor('landLine') ? 'is-invalid' : '' }`}
                                            value={this.state.product.landLine || ''}
                                            onChange={this.handleFieldLandline}
                                        />
                                        {this.renderErrorFor('landLine')}
                                        <label htmlFor="connection">Connection</label>
                                        <input 
                                            id="connection"
                                            type="text"
                                            name="connection"
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
