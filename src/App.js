import React, { FunctionComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
];
//компоненты для z
const meanUV=Number(data.map(elem=>elem.uv).reduce((a, b) => a + b, 0)/data.length)
const dUv=Number(Math.sqrt(data.map(elem =>Math.pow((elem.uv-meanUV),2)).reduce((a, b) => a+b, 0)/(data.length-1)))
const meanPV=Number(data.map(elem=>elem.pv).reduce((a, b) => a + b, 0)/data.length)
const dPv=Number(Math.sqrt(data.map(elem =>Math.pow((elem.pv-meanPV),2)).reduce((a, b) => a+b, 0)/(data.length-1)))

const CustomizedDot: FunctionComponent <any> = (props: any) => {
  
  const { cx, cy, value, dataKey } = props;
  
let z;
if(dataKey === 'uv'){
  z=Number((value-meanUV)/dUv)
} else if(dataKey === 'pv') { z=Number((value-meanPV)/dPv)}


  if (z>1||z<-1) {
    
    
    return (
      <svg
        x={cx - 10}
        y={cy - 10}
        width={20}
        height={20}
        fill="red"
        viewBox="0 0 1024 1024"
      >
        <path d="M 512 1009.984 c -274.912 0 -497.76 -222.848 -497.76 -497.76 s 222.848 -497.76 497.76 -497.76 c 274.912 0 497.76 222.848 497.76 497.76 s -222.848 497.76 -497.76 497.76" />
      </svg>
    );
  }

  return (
    
    <svg
      x={cx - 10}
      y={cy - 10}
      width={20}
      height={20}
      fill="blue"
      viewBox="0 0 1024 1024"
    >
      <path d="M 512 1009.984 c -274.912 0 -497.76 -222.848 -497.76 -497.76 s 222.848 -497.76 497.76 -497.76 c 274.912 0 497.76 222.848 497.76 497.76 s -222.848 497.76 -497.76 497.76" />
    </svg>
  );
};


function getPers(num){
    return (+num/(data.length+1))*100
  }

export default function App() {
  return (
    <LineChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <defs>
        <linearGradient id="colorUv" x1="0%" y1="0" x2="100%" y2="0">
          
          <stop offset="0%" stopColor="red"/>
          <stop offset={`${getPers(1)}%`} stopColor="red"/>
          <stop offset={`${getPers(1)}%`} stopColor="blue"/>
          <stop offset={`${getPers(2)-3}%`} stopColor="blue"/>
          <stop offset={`${getPers(2)}%`} stopColor="red"/>
          <stop offset={`${getPers(3)-3}%`} stopColor="red"/>
          <stop offset={`${getPers(3)}%`} stopColor="blue"/>
          <stop offset={`${getPers(4)-3}%`} stopColor="blue"/>
          <stop offset={`${getPers(4)}%`} stopColor="red"/>
          <stop offset={`${getPers(5)+4}%`} stopColor="red"/>
          <stop offset={`${getPers(6)}%`} stopColor="blue"/>
          <stop offset="100%" stopColor="blue"/>
        </linearGradient>
         <linearGradient id="colorPv" x1="0%" y1="0" x2="100%" y2="0">
          
          <stop offset="0%" stopColor="blue"/>
          <stop offset={`${getPers(1)-2}%`} stopColor="blue"/>
          <stop offset={`${getPers(1)}%`} stopColor="red"/>
          <stop offset={`${getPers(3)-3}%`} stopColor="red"/>
          <stop offset={`${getPers(3)}%`} stopColor="blue"/>
          <stop offset="100%" stopColor="blue"/>
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="uv"
        stroke="url(#colorUv)"
        dot={<CustomizedDot />}
      />
      <Line type="monotone" dataKey="pv" stroke="url(#colorPv)" dot={<CustomizedDot/>} />
    </LineChart>
  );
}
