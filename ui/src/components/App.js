import React, { Component } from 'react';
import LoginForm from './LoginForm';
import { isLoggedIn } from '../util/auth'

import Charts from './Charts';

class App extends Component {
  render() {
    if (isLoggedIn()) {
      return <Charts />;
    }

    return <LoginForm />;
  }
}

export default App;
