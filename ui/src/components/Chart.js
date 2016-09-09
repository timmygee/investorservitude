import React, { Component, PropTypes } from 'react';
import NVD3Chart from 'react-nvd3';
import d3 from 'd3';

import actions from '../actions/actions';
import store from '../store/store';


export default class Chart extends Component {
  constructor() {
    super();
    this.state = store.getSecuritiesStore();

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    const filter = {};
    actions.getSecurities({ filter });
  }

  componentWillMount() {
    store.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    store.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState(store.getSecuritiesStore());
  }

  render() {
    const { securities } = this.state;
    const xAxis = {
      tickFormat(d) {
        console.log(d)
        const format = d3.time.format('%Y-%m-%d');
        console.log(format(new Date(d)));
        return format(new Date(d));
      },
      axisLabel: 'Date',
      rotateLabels: 90,
    };
    const yAxis = {
      // tickFormat: function(d) {return parseFloat(d).toFixed(2); }
      axisLabel: 'Value',
    };

    return (
      <div className="chart">
        <NVD3Chart
          type="lineChart"
          datum={securities}
          width="800"
          height="600"
          x={(d) => (new Date(d.created))}
          y="value"
          xAxis={xAxis}
          yAxis={yAxis}
          showXAxis={true}
          showYAxis={true}
          useInteractiveGuideline={true}
          legendPosition="top"
        />
        <pre>{ JSON.stringify(securities, null, 2) }</pre>
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
