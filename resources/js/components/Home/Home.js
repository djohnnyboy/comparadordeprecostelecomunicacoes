import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';

class Home extends Component {

    constructor(props){
        super(props)
        this.state = {  
            channels: [],
            internetGb: [],
            errors:[]
        };     
    }

   
    componentWillMount (){
        axios.post('/api/products').then(json => {
            this.setState({
                channels: json.data.channels,
                internetGb: json.data.internetGb
            })
        }).catch(error => {
            this.setState({
                errors: error.json.data.errors
            })
        }).finally(this.setState({errors: ' ' }));
    } 
    

    render() {

        let { channels } = this.state;
        let { internetGb } = this.state;

        const margin = {
            marginTop: "50px"
        } 

        const postCodeAux = {
            borderColor: "#ced4da",
            borderRadius: "5%",
            borderWidth: "1px"
        }

        const contract = [];
        for (let index = 0; index < 25; index++) {
            if (this.props.values.contractTime == index) {
                contract.push(<option key={index} values={index} defaultValue>{index}</option>)
            }else{
                contract.push(<option key={index} values={index}>{index}</option>)
            }            
        }

        const phones = [];
        for (let j = 0; j < 5; j++) {
            if (this.props.values.phones == j) {
                phones.push(<option key={j} values={j} defaultValue>{j}</option>)
            }else{
                phones.push(<option key={j} values={j}>{j}</option>)
            }            
        }

        return (
            <div className="container" style={margin}>
                <div className="row">
                    <div className="offset-md-3 col-md-6 offset-md-3">
                        <div className="card">
                            <div className="card-header">
                                Comparador de telecomunicaçoes
                            </div>
                            <div className="card-body">
                            <form onSubmit={this.props.handleQuery}>
                            
                                <label htmlFor="contractTime">Tempo de fidelizacao restante ?</label>
                                <select 
                                    className="form-control" 
                                    id="contractTime" 
                                    className={`form-control form-control-lg mt-3
                                        ${this.props.hasError('contractTime') ? 'is-invalid' : ''}`}
                                    value={this.props.values.contractTime || ''}
                                    onChange={this.props.handleContract}>
                                        <option defaultValue>Escolha...</option>
                                    {contract}
                                </select>
                                {this.props.renderError('contractTime')} 
                               
                                <label htmlFor="email" className="mt-3">email</label>
                                <input 
                                    type="email" 
                                    id="email"
                                    className={`form-control form-control-lg mt-3 
                                    ${this.props.hasError('email') ? 'is-invalid' : ''}`}
                                    value={this.props.values.email || ''}
                                    onChange={this.props.handleEmail}
                                    placeholder="insira o seu email"
                                    />
                                    {this.props.renderError('email')}

                                <label htmlFor="number" className="mt-3">nº telefone</label>
                                <input 
                                    type="number" 
                                    id="number"
                                    className={`form-control form-control-lg mt-3 
                                    ${this.props.hasError('number') ? 'is-invalid' : ''}`}
                                    value={this.props.values.number || ''}
                                    onChange={this.props.handleNumber} 
                                    placeholder="insira seu telefone"
                                    />
                                    {this.props.renderError('number')}
                            
                                <label htmlFor="channels" className="mt-3">Canais Tv</label>
                                 <select 
                                    className={`form-control form-control-lg mt-3 
                                    ${this.props.hasError('channels') ? 'is-invalid' : ''}`}
                                    id="channels"
                                    value={this.props.values.channels || ''}
                                    onChange={this.props.handleChannels}
                                    >
                                   <option>nº max de canais...</option> 
                                    {channels.map((t, i) => { 
                                        return <option key={i}>{t.channels}</option>
                                    })} 
                                </select>
                                    {this.props.renderError('channels')} 

                                 <label className="mt-3">Internet casa max:</label>
                                <select 
                                    className={`form-control form-control-lg mt-3 
                                    ${this.props.hasError('internetGb') ? 'is-invalid' : ''}`}
                                    id="internetGb"
                                    value={this.props.values.internetGb || ''}
                                    onChange={this.props.handleInternetGb}>
                                    <option>Velocidade max: da internet...</option> 
                                    {internetGb.map((n, i )=> {
                                        return <option key={i}>{n.internetGb}</option>
                                    })} 
                                    
                                </select> 
                                    {this.props.renderError('internetGb')} 

                                <label htmlFor="phones" className="mt-3">Cartoes de Telemoveis + internet </label>
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-phone" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M11 1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z"/>
                                        <path fillRule="evenodd" d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                                    </svg>
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-phone-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M3 2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V2zm6 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                    </svg>                        
                                <div className="input-group">
                                    <select 
                                        className="form-control" 
                                        id="phones" 
                                        className={`form-control form-control-lg mt-3 
                                        ${this.props.hasError('phones') ? 'is-invalid' : ''}`}
                                        value={this.props.values.phones || ''}
                                        onChange={this.props.handlePhones}>
                                        <option defaultValue>Escolha...</option>
                                        {phones}
                                    </select>
                                    {this.props.renderError('phones')} 
                                </div>
                                <hr />  
                                 
                                <label htmlFor="postCode">Codigo Postal</label>
                               <div className="input-group mb-3">
                                    <input 
                                        type="number" 
                                        id="postCode"
                                        className={`form-control 
                                        ${this.props.hasError('postCode') ? 'is-invalid' : ''}`}
                                        value={this.props.values.postCode || ''}
                                        onChange={this.props.handlePostCode}    
                                        />
                                        
                                    <span className="input-group-text">-</span>
                                    <input 
                                        type="number" 
                                        id="postCodeAux"
                                        className={`${this.props.hasError('postCodeAux') ? 'is-invalid' : ''}`}
                                        value={this.props.values.postCodeAux || ''}
                                        onChange={this.props.handlePostCodeAux}    
                                        style={postCodeAux}/>
                                        {this.props.renderError('postCode')}
                                        {this.props.renderError('postCodeAux')}
                                </div>
                                <input type="submit" value="search" className="btn btn-primary w-100 mt-3" />
                             </form>         
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )
        }
}
    

export default withRouter(Home);
