import React, { Component } from 'react';


export default class LoginForm extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
    }
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    debugger;
  }

  render() {
    const { username, password } = this.state;

    return (
      <form className="login-box">
        <input type="text" placeholder="Username" defaultValue={username} />
        <input type="text" placeholder="Password" defaultValue={password} />
        <button type="submit" onClick={this.onSubmit}>Log In</button>
      </form>
    )
  }
}
