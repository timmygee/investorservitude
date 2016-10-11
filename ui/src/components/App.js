import React, { Component } from 'react';

import Charts from './Charts';
import LoginForm from './LoginForm';

import AuthStore from '../store/AuthStore';
import SecuritiesStore from '../store/SecuritiesStore';
import ApiActions from '../actions/ApiActions';
import { fluxContainer } from '/src/util/decorators';


@fluxContainer
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
    this.state = Object.assign(
      {}, AuthStore.getAuthStore(), SecuritiesStore.getSecuritiesStore());

    this.onChange = this.onChange.bind(this);
    this.handleOnClickLogout = this.handleOnClickLogout.bind(this);
  }

  componentDidMount() {
    // ApiActions.getAuthToken();    
  }

  componentWillMount() {
    AuthStore.addChangeListener(this.onChange);
    SecuritiesStore.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    AuthStore.removeChangeListener(this.onChange);
    SecuritiesStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState(
      Object.assign({}, AuthStore.getAuthStore(), SecuritiesStore.getSecuritiesStore())
    );
  }

  handleOnClickLogout(event) {
    event.preventDefault();
    ApiActions.logout();
  }

  render() {
    const { authStore, securitiesStore } = this.state;
    const { loggedIn } = auth;
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

export default App;
