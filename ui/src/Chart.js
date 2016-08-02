import React, { Component, PropTypes } from 'react';

import API from './api';


export default class Chart extends Component {
  constructor() {
    super();
    this.state = {};
    this.api = new API('tim', 'testings');

    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick(event) {
    this.api.get('holdings')
      .then(data => this.setState(data))
  }

  render() {
    const { items } = this.state;

    return (
      <div className="chart">
        <button onClick={this.handleButtonClick}>Go</button>
        <p>{ JSON.stringify(this.state) }</p>
        { 
          items &&
          <ul>
            { items.map(item => <li key={item.key}>{item}</li>) }
          </ul>
        }
      </div>
    );
  }
};
