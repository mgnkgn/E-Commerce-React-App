import React from "react";
import {
  LineChart,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  Line,
  Area,
} from "recharts";
const ChartSoldProducts = ({ relatedData }) => {
  const data = [];
  const dates = relatedData.map((el) => el.uDate);
  const profits = relatedData.map((el) => el.price * el.qt);
  const sortedDates = dates.sort(function (a, b) {
    a = a.split("/").reverse().join("");
    b = b.split("/").reverse().join("");
    return a < b ? 1 : a > b ? -1 : 0;
  });
  // .map((item) => item.slice(3, 10)); ////if we want to just show day/month

  for (let i = dates.length; i >= 0; i--) {
    data.push({
      name: sortedDates[i],
      "Profit Made": profits[i],
    });
  }

  const addDollarSign = (el) => el + "$";
  const updatedData = data.map((el) => ({
    ...el,
    "Profit Made": addDollarSign(el["Profit Made"]),
  }));
  const updatedDataDef = updatedData.slice(1, updatedData.length);

  return (
    <div className="chart-container">
      <h2 className="chart-header">Profit & Time </h2>
      <AreaChart
        width={625}
        height={250}
        data={data}
        margin={{ top: 10, right: 65, left: -20, bottom: 10 }}
      >
        <defs>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="aqua" stopOpacity={0.8} />
            <stop offset="95%" stopColor="royalblue" stopOpacity={0.2} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />

        <Area
          type="monotone"
          dataKey="Profit Made"
          stroke="royalblue"
          fillOpacity={1}
          fill="url(#colorPv)"
        />
      </AreaChart>
    </div>
  );
};

export default ChartSoldProducts;
