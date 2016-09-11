import moment from 'moment';
import React, { Component, PropTypes } from 'react';
import { ResponsiveContainer, LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';


const baseStyle = {
  p: {
    padding: 0,
    margin: '0 0 3px 0',
    fontSize: '12px',
    lineHeight: '12px',
  },
}

const style = {
  h2: {
    textAlign: 'center',
  },
  lineChart: {
    margin: '0 auto',
    fontSize: '10px',
  },
  tooltip: {
    backgroundColor: '#FEF6EB',
    padding: '5px',
    border: '1px solid #C25B56',
    opacity: 0.8,
  },
  p: Object.assign({}, baseStyle.p),
  label: Object.assign({}, baseStyle.p, { 
    fontWeight: 'bold',
    marginBottom: '5px',
  }),
};

const formatDate = date => moment(date).format('YYYY-MM-DD');

const customToolTip = props => {
  return (
    <div style={style.tooltip}>
      <p style={style.label}>{formatDate(props.label)}</p>
      {
        props.payload && props.payload.map((item, index) => {
          const { name, value, dataKey } = item;
          return (
            <p key={`tooltip-${index}`} style={style.p}>
              <span>{name}:</span> <span>{dataKey === 'value' ? '$' : ''}{value}</span>
            </p>
          );
        })
      }
    </div>
  );
};

const customTick = props => {
  const { x, y, stroke, payload } = props;
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">{formatDate(payload.value)}</text>
    </g>    
  );
}

const SecurityLineChart = props => {
  const { security, valueColor, holdingColor, syncId } = props;
  const { values, key } = security;

  return (
    <div className="sec-line-chart">
      <h2 style={style.h2}>{key}</h2>
        <LineChart
          width={1024}
          height={300}
          margin={{ top: 5, right: 5, bottom: 40, left: 5 }}
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
            tick={customTick}
          />
          <YAxis type="number" domain={['auto', 'dataMax + 1000']} />
          <CartesianGrid strokeDasharray="3 3"/>
          <Tooltip content={customToolTip} />
          <Line
            name="Dollar Value"
            type="monotone"
            dataKey="value"
            dot={false}
            activeDot={{ r: 3 }}
            stroke={valueColor}
            strokeWidth={2}
            fill={valueColor}
          />
          <Line
            name="Units Holding"
            type="monotone"
            dataKey="holding"
            dot={false}
            activeDot={{ r: 3 }}
            stroke={holdingColor}
            strokeWidth={2}
            fill={holdingColor}
          />
        </LineChart>
    </div>
  )
};

export default SecurityLineChart;
