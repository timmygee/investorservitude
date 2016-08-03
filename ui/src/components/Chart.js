import React, { Component, PropTypes } from 'react';


export default class Chart extends Component {
  constructor() {
    super();
    this.state = {};

    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick(event) {
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
