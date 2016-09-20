import React, { Component } from 'react';

import Charts from './Charts';
import LoginForm from './LoginForm';

import AuthStore from '../store/AuthStore';
import SecuritiesStore from '../store/SecuritiesStore';
import ApiActions from '../actions/ApiActions';


class App extends Component {
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
    const { loggedIn, securities } = this.state;

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
              <LoginForm authStore={AuthStore.getAuthStore()} />
          }
        </div>
      </div>
    );
  }
}

export default App;
