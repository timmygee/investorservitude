import moment from 'moment';
import React, { Component, PropTypes } from 'react';
import { ResponsiveContainer, LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';


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
  chartContainer: {
    width: '1024px',
    margin: '0 auto',
  },
  lineChart: {
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
  slider: {
  }
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
              <span>{name}:</span> <span>{['value', 'close_price'].indexOf(dataKey) >= 0 ? '$' : ''}{value}</span>
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

class SecurityLineChart extends Component {
  constructor(props) {
    super(props);

    const { security } = props;

    this.state = {
      xMin: 0,
      xMax: security.values.length - 1,
    };

    this.onSliderChange = this.onSliderChange.bind(this);
  }

  onSliderChange(values) {
    const [ xMin, xMax ] = values;
    this.setState({ xMin, xMax })
  }

  render() {
    const { security, valueColor, holdingColor, syncId } = this.props;
    const { values, key } = security;
    const { xMin, xMax } = this.state;
    const chartValues = values.slice(xMin, xMax);

    const sliderTipFormatter = value => formatDate(values[value].created);

    return (
      <div className="chart-container" style={style.chartContainer}>
        <h2 style={style.h2}>{key}</h2>
          <LineChart
            width={1024}
            height={300}
            margin={{ top: 5, right: 5, bottom: 40, left: 5 }}
            style={style.lineChart}
            syncId={syncId}
            data={
              chartValues.map(value => ({
                created: value.created, 
                value: Number(value.value),
                close_price: Number(value.close_price),
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
          <Slider
            style={style.slider}
            range={true}
            allowCross={false}
            pushable={2}
            min={0}
            max={values.length - 1}
            defaultValue={[xMin, xMax]}
            onChange={this.onSliderChange}
            tipFormatter={sliderTipFormatter}
          />
      </div>
    );
  }
};

export default SecurityLineChart;
