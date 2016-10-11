import React, { Component } from 'react';

import Charts from './Charts';
import LoginForm from './LoginForm';

import AuthStore from '../store/AuthStore';
import SecuritiesStore from '../store/SecuritiesStore';
import ApiActions from '../actions/ApiActions';
import { Container } from 'flux/utils';


class App extends Component {
  static getStores() {
    return [
      AuthStore,
      SecuritiesStore,
    ];
  }

  static calculateState() {
    return {
      auth: AuthStore.getState().toObject(),
      securities: SecuritiesStore.getSecurities(),
    };
  }

  constructor() {
    super();

    this.handleOnClickLogout = this.handleOnClickLogout.bind(this);
  }

  componentDidMount() {
    // ApiActions.getAuthToken();    
  }

  handleOnClickLogout(event) {
    event.preventDefault();
    ApiActions.logout();
  }

  render() {
    const { auth, securities } = this.state;
    const { loggedIn } = auth;

    return (
      <div>
        <nav>
          { 
            loggedIn && <button onClick={this.handleOnClickLogout}>Log out</button>
          }
        </nav>
        <div>
          { 
            loggedIn ?
              <Charts securities={securities} /> :
              <LoginForm {...auth} />
          }
        </div>
      </div>
    );
  }
}

export default Container.create(App);
