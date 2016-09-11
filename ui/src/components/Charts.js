import React, { Component, PropTypes } from 'react';

import actions from '../actions/actions';
import store from '../store/store';
import SecurityLineChart from './SecurityLineChart';


const niceColors = [
  '#525564',
  '#74828F',
  '#96C0CE',
  '#BEB9B5',
  '#C25B56',
  '#FEF6EB',
];

const style = {
  chartItem: {
    marginBottom: '40px',
  }
};

export default class Charts extends Component {
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

    // const xAxis = {
    //   tickFormat(d) {
    //     console.log(d)
    //     const format = d3.time.format('%Y-%m-%d');
    //     console.log(format(new Date(d)));
    //     return format(new Date(d));
    //   },
    //   axisLabel: 'Date',
    //   rotateLabels: 90,
    // };
    // const yAxis = {
    //   // tickFormat: function(d) {return parseFloat(d).toFixed(2); }
    //   axisLabel: 'Value',
    // };

    return (
      <div className="charts">
        {
          securities &&
          securities.map(
            (security, index) => (
              <div key={security.key} style={style.chartItem}>
                <SecurityLineChart
                  syncId="sec-sync"
                  lineColor={niceColors[index]}
                  holdingColor={niceColors[index + 1]}
                  security={security}
                />
              </div>
            )
          )
        }

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
