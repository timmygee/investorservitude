import moment from 'moment';
import React, { Component, PropTypes } from 'react';
import { LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';


const SecurityLineChart = props => {
  const { security, valueColor, holdingColor, syncId } = props;
  const { values, key } = security;

  return (
    <div className="sec-line-chart">
      <h2>{key}</h2>
      <LineChart
        width={640}
        height={480}
        margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
        syncId={syncId}
        data={
          values.map(value => ({
            created: value.created, 
            value: Number(value.value),
            holding: value.holding,
          }))
        }
      >
        <XAxis 
          dataKey="created"
          tickFormatter={date => (moment(date).format('YYYY-DD-MM'))}
        />
        <YAxis type="number" domain={[0, 'dataMax + 1000']} />
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip />
        <Line dataKey="value" stroke={valueColor} fill={valueColor} />
        <Line dataKey="holding" stroke={holdingColor} fill={holdingColor} />
      </LineChart>
    </div>
  )
};

export default SecurityLineChart;
