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
      authStore: AuthStore.getState(),
      securitiesStore: SecuritiesStore.getState(),
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
    const { authStore, securitiesStore } = this.state;
    const { loggedIn } = authStore;
    const { securities } = securitiesStore;

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
              <LoginForm authStore={authStore} />
          }
        </div>
      </div>
    );
  }
}

export default Container.create(App);
