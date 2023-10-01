import React, { useState, useEffect } from 'react';
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
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './StockSection.css';

const StockSection = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://stockpredictor-backend-urtjok3rza-wl.a.run.app/dashboard/stockcard_data'
        );
        const stockData = response.data;

        // Create an array to store the transformed data for each company
        const transformedData = [];

        // Loop through each company in stockData
        for (const company in stockData) {
          if (Array.isArray(stockData[company])) {
            // Transform the data for each company to match Recharts requirements (date and close properties)
            const companyData = stockData[company].map((item) => ({
              date: item.Date,
              close: item.Close,
              high: item.High,
              low: item.Low,
              open: item.Open,
            }));

            // Add the transformed data to the array
            transformedData.push({
              company,
              symbol: stockData[company][0].symbol,
              icon: stockData[company][0].icon,
              data: companyData,
            });
          }
        }

        setData(transformedData);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Configure the carousel settings
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, 
    slidesToScroll: 1,
    autoplay: true, // Enable automatic carousel
    autoplaySpeed: 3000, // Time (in milliseconds) between slide transitions
    cssEase: 'linear', // Use linear CSS easing for the fade effect


  };


  const NextArrow = ({ onClick }) => (
    <div className="slick-arrow next-arrow" onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M7.707 6.293l1.414-1.414L15.414 12l-6.293 6.293-1.414-1.414L12.586 12z" />
      </svg>
    </div>
  );
  return (
    <div>
      <h1 className="heading-stock">Trending Stocks</h1>
      <div className="container">
        <Slider {...carouselSettings} nextArrow={<NextArrow />}>
          {data.map((companyData, index) => (
            <div
              key={companyData.company}
              className={`chart-card ${index === data.length - 1 ? 'last-card' : ''}`}
            >
              <div className="card-header">
                <img src={companyData.icon} alt={companyData.company} className="company-icon" />
                <div className="card-title">
                  <h2>{companyData.company}</h2>
                  <span className="company-symbol">({companyData.symbol})</span>
                </div>
              </div>
              <div className="divider"></div>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={companyData.data}>
                    <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#888' }} />
                    <YAxis tick={{ fontSize: 12, fill: '#888' }} domain={['auto', 'auto']} />
                    <CartesianGrid stroke="#eee" />
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
              <div className="divider"></div>
              <div className="data-container">
                <div className="data-item">
                  <span className="data-label">High:</span>
                  <span className="data-value">{companyData.data[0].high}</span>
                </div>
                <div className="divider-vertical"></div>
                <div className="data-item">
                  <span className="data-label">Low:</span>
                  <span className="data-value">{companyData.data[0].low}</span>
                </div>
                <div className="divider-vertical"></div>
                <div className="data-item">
                  <span className="data-label">Open:</span>
                  <span className="data-value">{companyData.data[0].open}</span>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default StockSection;
