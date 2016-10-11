import React, { Component } from 'react';
import AuthStore from '../store/AuthStore';
import LoginForm from './LoginForm'


// higher order component to enforce logged in status
const LoginRequired = ComposedComponent => class extends Component {
  constructor(props) {
    super(props);

    this.state = AuthStore.getAuthStore();
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    AuthStore.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    AuthStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState(AuthStore.getAuthStore());
  }

  render() {
    const { loggedIn } = this.state;

    if (loggedIn) {
      return (<ComposedComponent {...this.props} />);
    }

    return (<LoginForm />);
  }
  
};

export default LoginRequired;
