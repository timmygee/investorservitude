import React, { Component, PropTypes } from 'react';

import ApiActions from '../actions/ApiActions';
import SecurityLineChart from './SecurityLineChart';
import loginRequired from './LoginRequired';


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

class Charts extends Component {
  // componentDidMount() {
  //   // filter does nothing currently but here as a placeholder for a possible future feature 
  //   const filter = {};
  //   ApiActions.getSecurities({ filter });
  // }

  render() {
    const { securities } = this.props;

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

export default Charts;
