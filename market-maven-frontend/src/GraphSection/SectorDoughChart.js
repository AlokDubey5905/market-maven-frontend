import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import './SectorDoughChart.css';

const COLORS = ['#911f67', '#999', '#19a59c'];

const SectorDoughChart = ({ sector }) => {
  const [sentimentsData, setSentimentsData] = useState({});
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchSentimentsData = async () => {
      try {
        const sentimentsResponse = await axios.get(
          `https://stockpredictor-backend-urtjok3rza-wl.a.run.app/sector/cummulative_result/${sector}`
        );
        if (isMounted) {
          setSentimentsData(sentimentsResponse.data);
        }
      } catch (error) {
        console.error('Error fetching sentiments data:', error);
      }
    };

    fetchSentimentsData();

    return () => {
      isMounted = false;
    };
  }, [sector]);

  if (Object.keys(sentimentsData).length === 0) {
    return <div style={{ color: 'whitesmoke',marginLeft:'1.3rem' }}>Calculating Prediction...</div>;
  }

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
    <div className="dough-card-sector">
      <div className="card-header-sector">
        <div className="card-title-sector">
          <h3 style={{ color: 'Black' }}>Sector Cumulative Sentiments</h3>
        </div>
      </div>

      <div className="chart-container-dough-sector">
        <ResponsiveContainer width="100%" height={250}>
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
              wrapperStyle={{ fontSize: 12, color: '#333' }}
              formatter={renderLegend}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SectorDoughChart;
