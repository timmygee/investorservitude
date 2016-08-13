import React, { Component, PropTypes } from 'react';

import actions from '../actions/actions';
import store from '../store/store';


export default class Chart extends Component {
  constructor() {
    super();
    this.state = store.getChartStore();

    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    store.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    store.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState(store.getChartStore());
  }

  handleButtonClick(event) {
    const filter = {};
    actions.getHoldings({ filter });
  }

  render() {
    const { holdings } = this.state;

    return (
      <div className="chart">
        <button onClick={this.handleButtonClick}>Go</button>
        <p>{ JSON.stringify(this.state) }</p>
      </div>
    );
  }
};
        // { 
        //   holdings &&
        //   <ul>
        //     { holdings.map(holding => <li key={holding.key}>{holding}</li>) }
        //   </ul>
        // }
