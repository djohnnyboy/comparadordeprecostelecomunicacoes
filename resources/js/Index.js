import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router-dom';
import Main from './Main';
import StinkyFooter from './components/Footer/StinkyFooter'; 
import * as serviceWorker from './serviceWorker';
import { createBrowserHistory } from "history";
import Header from './components/Header/header';

export default class Index extends Component {
  
  render() {
    const customHistory = createBrowserHistory();
    return (
      <div>   
        <Router 
          history={customHistory}
          basename = '/' >
        <Header />
        <Main component={Main} />
        <StinkyFooter />
        </Router>
        
      </div>
    );
  }
}
ReactDOM.render(<Index/>, document.getElementById('index'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();