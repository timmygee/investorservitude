import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import App from './components/App';
import LoginForm from './components/App';

import { isLoggedIn } from './util/auth'


const requireAuth = (nextState, replace) => {
  if (!isLoggedIn()) {
    replace({ 
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    });
  }
}

ReactDOM.render((
    <Router history={browserHistory}>
      <Route path="/">
        <Route path='login' component={LoginForm} />
        <Route path='app' component={App} onEnter={requireAuth} />
      </Route>
    </Router>
  ), document.getElementById('root')
);
