import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import './DoughnutGraph.css';

const COLORS = ['#911f67', '#999', '#19a59c'];

const DoughnutGraph = ({ companyName }) => {
  const [sentimentsData, setSentimentsData] = useState({});
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchSentimentsData = async () => {
      try {
        const sentimentsResponse = await axios.get(
          `https://stockpredictor-backend-urtjok3rza-wl.a.run.app/predict_stock/cummulative_sentiments/${companyName}`
        );

        if (isMounted) {
          setSentimentsData(sentimentsResponse.data);
        }
        // console.log(sentimentsData);
      } catch (error) {
        console.error('Error fetching sentiments data:', error);
      }
    };

    fetchSentimentsData();

    return () => {
      isMounted = false;
    };
  }, [companyName]);


  const formattedSentimentsData = [
    { name: 'Negative', value: sentimentsData.Negative },
    { name: 'Neutral', value: sentimentsData.Neutral },
    { name: 'Positive', value: sentimentsData.Positive },
  ];

  const handleSectorMouseEnter = (data, index) => {
    setHoveredIndex(index);
  };

  const handleSectorMouseLeave = () => {
    setHoveredIndex(null);
  };

  const renderLegend = (value, entry) => {
    const color = COLORS[formattedSentimentsData.findIndex((item) => item.name === value)];
    return <span style={{ color }}>{value}</span>;
  };

  return (
    <div className="dough-card">
        <div className="card-header">
          <div className="card-title">
            {sentimentsData.prediction && (
              <span className="chart-label-dough">
                Previous Week's Cummulative Sentiments
              </span>
            )}
          </div>
        </div>
  
        <div className="chart-container-dough">
          <ResponsiveContainer  height={250}>
            <PieChart>
              <Pie
                data={formattedSentimentsData}
                dataKey="value"
                outerRadius={80}
                innerRadius={40}
                labelLine={false}
                onMouseEnter={handleSectorMouseEnter}
                onMouseLeave={handleSectorMouseLeave}
              >
                {formattedSentimentsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip
                wrapperStyle={{
                  backgroundColor: '#fff',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #ccc',
                }}
                labelStyle={{ fontWeight: 'bold', color: '#333' }}
                itemStyle={{ color: '#888' }}
              />
              {/* Create a separate Legend component for the doughnut chart */}
              <Legend
                iconType="square"
                wrapperStyle={{ fontSize: 12, color: '#333'}}
                formatter={renderLegend}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      
    
    </div>
  );
};

export default DoughnutGraph;