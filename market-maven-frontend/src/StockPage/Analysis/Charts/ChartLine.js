import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import './ChartLine.css';

const ChartLine = ({ companyName }) => {
  const [companyData, setCompanyData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://stockpredictor-backend-urtjok3rza-wl.a.run.app/predict_stock/stock_data/${companyName}`
        );
        setCompanyData(response.data);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    fetchData();
  }, [companyName]);

  if (!companyData || companyData.length === 0) {
    return <div style={{color:'whitesmoke'}}>Collecting Stock Data...</div>;
  }

  // Reformat stock data to match the Recharts LineChart expected format
  const formattedData = companyData.map((item) => ({
    date: item.datetime,
    close: item.Close,
    high: item.High,
    low: item.Low,
    open: item.Open,
    status: item.Status === 'Increased' ? 'increased' : 'decreased',
  }));

  const lastIndex = formattedData.length - 1;
  const currentData = formattedData[lastIndex];

  return (
    <div className="stock-card">
      <div key={companyData.name} className="chart-card">
        <div className="card-header">
          <div className="card-title" >
            <span className={`status ${currentData.status}`}>
            
             <span > Close: </span><span className="data-value close">{`$${currentData.close}`}</span>
            </span>
          </div>
        </div>
        <div className="chart-container-line">
          <ResponsiveContainer width="100%" height={260}>   

            
            <LineChart data={formattedData}>
            <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#1a1919' }} />

              <YAxis tick={{ fontSize: 12, fill: '#1a1919' }} domain={['auto', 'auto']} />
              <CartesianGrid stroke="#8e9dae" strokeDasharray="3 3"/>
              <Tooltip
                wrapperStyle={{
                  backgroundColor: '#fff',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #ccc',
                }}
                labelStyle={{ fontWeight: 'bold', color: '#333' }}
                itemStyle={{ color: '#888' }}
              />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 12, color: '#333' }} />

              <Line
                type="linear"
                dataKey="close"
                name="Close"
                stroke="#26890D"
                strokeWidth={2}
                dot={{ fill: '#fff', stroke: '#000', strokeWidth: 2 }}
                activeDot={{ fill: '#000', stroke: '#fff', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
          <div className="data-container">
                <div className="data-item high">
                  <span className="data-label">High:</span>
                  <span className="data-value">{currentData.high}</span>
                </div>
                <div className="divider-vertical"></div>
                <div className="data-item low">
                  <span className="data-label">Low:</span>
                  <span className="data-value">{currentData.low}</span>
                </div>
                <div className="divider-vertical"></div>
                <div className="data-item open">
                  <span className="data-label">Open:</span>
                  <span className="data-value">{currentData.open}</span>
                </div>
              </div>


      </div>
  
    </div>
   
    
  );
};

export default ChartLine;
