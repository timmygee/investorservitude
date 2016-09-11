import React, { Component, PropTypes } from 'react';

import ApiActions from '../actions/ApiActions';
import SecurityLineChart from './SecurityLineChart';
import SecuritiesStore from '../store/SecuritiesStore';


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
    this.state = SecuritiesStore.getSecuritiesStore();

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    // filter does nothing currently but here as a placeholder for a possible future feature 
    const filter = {};
    ApiActions.getSecurities({ filter });
  }

  componentWillMount() {
    SecuritiesStore.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    SecuritiesStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState(SecuritiesStore.getSecuritiesStore());
  }

  render() {
    const { securities } = this.state;

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
