import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, Tooltip } from "recharts";
import "./SentimentBarChart.css"; // Import the CSS file

const SentimentBarChart = ({ data }) => {
  console.log(data);
  return (
    <div className="sentiment-card">
      <div className="chart-section">
        <div className="chart-container-sentiment">
          <BarChart width={500} height={390} data={data} margin={{ top: 20, right: 30, left: 0, bottom: 50 }} barGap={2} >
            <CartesianGrid stroke="#8e9dae" strokeDasharray="3 3" />
            <XAxis dataKey="datetime" angle={-45} textAnchor="end"tick={{ fontSize: 12, fill: '#1a1919' }}  />
            <YAxis tick={{ fontSize: 12, fill: '#1a1919' }} />
            <Tooltip /> 
            <Legend
              layout="horizontal"
              verticalAlign="top"
              align="center"
            />
            <Bar dataKey="Positive" fill="#19a59c" name="Positive" />
            <Bar dataKey="Negative" fill="#911f67" name="Negative" />
            <Bar dataKey="Neutral" fill="#999" name="Neutral" />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default SentimentBarChart;
