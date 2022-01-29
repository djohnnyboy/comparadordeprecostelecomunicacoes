import React, { Component } from 'react';

export default class header extends Component {
  constructor(props) {
      super(props);
        this.state = {
          isLoggedIn: false,
          user: {}
        };
        this.logOut = this.logOut.bind(this);
    }

    componentWillMount() {
      let state = localStorage["appState"];
      if (state) {
      let AppState = JSON.parse(state);
          this.setState({isLoggedIn: AppState.isLoggedIn,user: AppState.user});
      }
    }
    // 1.2
    logOut() {
      let appState = {
        isLoggedIn: false,
        user: {}
      };
      localStorage["appState"] = JSON.stringify(appState);
      this.setState(appState);
      this.props.history.push('/login');
    }
    render() {
      console.log(this.state.isLoggedIn)
        return (
            <div className="fixed-top">
            <div className="collapse" id="navbarToggleExternalContent">
                <div className="bg-dark p-4">
                <h5 className="text-white h4">Ligue já</h5>
                <span className="text-muted">926136060</span>
              
                <form onSubmit={this.logOut}>
                  {this.state.isLoggedIn == true && <button type="submit">logout</button>}
                </form> 
                </div>
            </div>
            <nav className="navbar navbar-dark bg-dark">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <h6 className="text-white float-right mt-1">Comparador de preços Telecomunicações</h6>
            </nav>
            </div>
        )
    }
}
