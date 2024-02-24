import React, { PureComponent } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
} from "recharts";
import {  Sector, Cell} from 'recharts';

import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';


export default class LineChartComp extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        style={{
          width: "100%",
          fontSize: "12px",
          textAlign: "center",
          paddingTop: "4px",
        }}
      >
        <p>invoice per months</p>

        <ResponsiveContainer width="100%" height={210}>
          <AreaChart
            width={500}
            height={200}
            data={this.props.newData}
            syncId="anyId"
            margin={{
              top: 35,
              right: 17,
              left: -25,
              bottom: -10,
            }}
          >
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
              fill="#8884d8"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }
}




const COLORS = ['#23ac76', '#de535e'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export class PieComp extends PureComponent {
  // static demoUrl = 'https://codesandbox.io/s/pie-chart-with-customized-label-dlhhj';
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            data={this.props.newData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {this.props.newData?.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    );
  }
}
