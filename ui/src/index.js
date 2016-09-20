import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

import { isLoggedIn } from './util/auth';


const requireAuth = (nextState, replace) => {
  if (!isLoggedIn()) {
    replace({ 
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
    });
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
