import React, { Component } from 'react';
import Home from './Home';
import Query from './Query';

export default class Toggle extends Component {
    constructor(props){
        super(props)
        this.state = {
            isToggled: false,
            errors: [],
            products: {},
            localities: {},
            internetGb: '',
            channels: '',
            query: {
                contractTime: '', 
                number: '',
                email: '', 
                channels: '',
                internetGb: '',
                landline:'c/ chamadas incluidas p/ 50 destinos internacionais.',
                phones: '',
                postCode: '',
                postCodeAux: '',             
            },
            queryResult: {},    
        }
        this.handlerFalse = this.handlerFalse.bind(this);
        this.handleChangeContractTime = this.handleChangeContractTime.bind(this); 

        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeNumber = this.handleChangeNumber.bind(this);
        /*
        this.handleChangeChannels = this.handleChangeChannels.bind(this);
        this.handleChangeInternetGb = this.handleChangeInternetGb.bind(this);
        */
        this.handleChangePhones = this.handleChangePhones.bind(this);
        this.handleChangePostCode = this.handleChangePostCode.bind(this);
        this.handleChangePostCodeAux = this.handleChangePostCodeAux.bind(this);

        this.handleNewQuery = this.handleNewQuery.bind(this)
        this.hasErrorFor = this.hasErrorFor.bind(this);
        this.renderErrorFor = this.renderErrorFor.bind(this); 
        this.messageContact = this.messageContact.bind(this)        
    }

    componentDidMount (){
        axios.post('/api/products').then(json => {
            this.setState({
                products: json.data.products,
                localities: json.data.localities,
                internetGb: json.data.internetGb,
                channels: json.data.channels
            })
        }).catch(error => {
            this.setState({
                errors: error.json.data.errors
            })
        }).finally(this.setState({errors: '' }));
    }

    handleNewQuery (event){
        event.preventDefault();
         const Query = {
            contractTime: this.state.query.contractTime, 
            number: this.state.query.number,
            email: this.state.query.email, 
            channels: this.state.channels,
            internetGb: this.state.internetGb,
            landline: this.state.query.landline,
            phones: this.state.query.phones,
            postCode: this.state.query.postCode,
            postCodeAux: this.state.query.postCodeAux,
         }
        
        axios.post('/api/queryNew', Query).then(json => {
                   
                this.setState(state => ({
                    isToggled: true,
                    queryResult: json.data.products
                }));                     
            })
            .catch(error => {
                this.setState({
                    errors: error.response.data.errors
                })
            }).finally(this.setState({errors: ''}));
     }

      handleChangeContractTime (event){
        let value = event.target.value;
        this.setState(prevState => ({
            query: {
            ...prevState.query, contractTime: value
            }
        }));
    } 

    handleChangeEmail (event){
        let value = event.target.value;
        this.setState(prevState => ({
            query: {
            ...prevState.query, email: value
            }
        }));
    }

    handleChangeNumber (event){
        let value = event.target.value;
        this.setState(prevState => ({
            query: {
            ...prevState.query, number: value
            }
        }));
    }
/*
    handleChangeChannels (event){
        let value = event.target.value;
        this.setState(prevState => ({
            query: {
            ...prevState.query, channels: value
            }
        }));
    }

    handleChangeInternetGb (event){
        let value = event.target.value;
        this.setState(prevState => ({
            query: {
            ...prevState.query, internetGb: value
            }
        }));
    }
*/
    handleChangePhones (event){
        let value = event.target.value;
        this.setState(prevState => ({
            query: {
            ...prevState.query, phones: value
            }
        }));
    }

    handleChangePostCode (event){
        let value = event.target.value;
        this.setState(prevState => ({
            query: {
            ...prevState.query, postCode: value
            }
        }));
    }

    handleChangePostCodeAux (event){
        let value = event.target.value;
        this.setState(prevState => ({
            query: {
            ...prevState.query, postCodeAux: value
            }
        }));
    }

    hasErrorFor (field){
        return !!this.state.errors[field]
    }
    
    renderErrorFor (field){
        if (this.hasErrorFor(field)) {
            return(
                <span className="invalid-feedback">
                    <strong>{this.state.errors[field][0]}</strong>
                </span>
            )
        }
    }

    handlerFalse() {
        this.setState(state => ({
            isToggled: false
        }));
    }

    messageContact(){
        alert('Será contactado em Breve.')
    }

    render() {
        return (
            <div>
                {(!this.state.isToggled) ? <Home
                    values={this.state.query}
                    localities={this.state.localities}
                    products={this.state.products}
                    handleQuery={this.handleNewQuery}
                    handleContract={this.handleChangeContractTime} 
                    handleEmail={this.handleChangeEmail} 
                    handleNumber={this.handleChangeNumber} 
                    handleChannels={this.handleChangeChannels} 
                    handleInternetGb={this.handleChangeInternetGb}
                    handlePhones={this.handleChangePhones} 
                    handlePostCode={this.handleChangePostCode} 
                    handlePostCodeAux={this.handleChangePostCodeAux}  
                    hasError={this.hasErrorFor}
                    renderError={this.renderErrorFor}

                /> :  <Query 
                        values={this.state.query}
                        localities={this.state.localities}
                        products={this.state.products}
                        handler={this.handlerFalse} 
                        result={this.state.queryResult}
                        messageContact={this.messageContact}
                /> }
            </div>
        )
    }
}
