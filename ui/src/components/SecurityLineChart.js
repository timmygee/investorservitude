import moment from 'moment';
import React, { Component, PropTypes } from 'react';
import { LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const style = {
  h2: {
    textAlign: 'center',
  },
  lineChart: {
    margin: '0 auto',
  },
};

const formatDate = date => moment(date).format('YYYY-DD-MM');

const customToolTip = props => {
  console.log(props) 
  return (
    <div className="tooltip">
      <p className="label">{formatDate(props.label)}</p>
      {
        props.payload && props.payload.map(item => {
          const { name, value } = item;
          return (
            <p>
              <span>{name}</span> <span>{value}</span>
            </p>
          );
        })
      }
    </div>
  );
  // Object.assign({}, props, { label: formatDate(props.label) });
};

const SecurityLineChart = props => {
  const { security, valueColor, holdingColor, syncId } = props;
  const { values, key } = security;

  return (
    <div className="sec-line-chart">
      <h2 style={style.h2}>{key}</h2>
      <LineChart
        width={1024}
        height={480}
        margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
        style={style.lineChart}
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
          tickFormatter={date => (formatDate(date))}
        />
        <YAxis type="number" domain={['auto', 'dataMax + 1000']} />
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip content={customToolTip} />
        <Line name="Dollar Value" type="monotone" dataKey="value" dot={false} activeDot={{ r: 3 }} stroke={valueColor} fill={valueColor} />
        <Line name="Units Holding" type="monotone" dataKey="holding" dot={false} activeDot={{ r: 3 }} stroke={holdingColor} fill={holdingColor} />
      </LineChart>
    </div>
  )
};

export default SecurityLineChart;
