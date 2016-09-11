import React, { Component, PropTypes } from 'react';
import ApiActions from '../actions/ApiActions';
import AuthStore from '../store/AuthStore';


// A bit hacky because I'm not using controlled components for each input 
// but this is fine for the current purposes of the app
export default class LoginForm extends Component {
  contextTypes: {
    router: PropTypes.object.isRequired,
  }

  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      token: null,
      error: null,
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.updateStateProp = this.updateStateProp.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
  }

  componentWillMount() {
    AuthStore.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    AuthStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState(Object.assign({}, this.state, AuthStore.getAuthStore()));
  }

  onSubmit(event) {
    event.preventDefault();
    const { username, password } = this.state;

    if (!(username && password)) {
      this.updateStateProp('error', new Error('Please enter a username and password'));
    } else {
      ApiActions.getAuthToken(username, password)
    }
  }

  updateStateProp(name, value) {
    const updatedState = Object.assign({}, this.state);
    updatedState[name] = value;
    this.setState(updatedState);
  }

  onChangeUsername(event) {
    this.updateStateProp('username', event.target.value);
  }

  onChangePassword(event) {
    this.updateStateProp('password', event.target.value);
  }

  render() {
    const { username, password, token, error } = this.state;

    return (
      <form className="login-box">
        { error && <p>{error.message}</p> }
        <input type="text" placeholder="Username" defaultValue={username} onChange={this.onChangeUsername} />
        <input type="password" placeholder="Password" defaultValue={password} onChange={this.onChangePassword} />
        <button onClick={this.onSubmit}>Log In</button>
      </form>
    );
  }
}
