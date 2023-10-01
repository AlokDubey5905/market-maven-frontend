import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './StockTiles.css';

const Card = ({ data, navigate, companyName }) => {
  const { symbol, Close, Status, icon } = data;
  const roundedClose = Close.toFixed(2);
  const statusColor = Status === 'Increased' ? 'green' : 'red';
  const statusIcon = Status === 'Increased' ? '▲' : '▼';
  const handleCompanyClick = (companyName) => {
    navigate(`/stockpage/${companyName}`);
  };

  return (
    <div className="card-tiles" onClick={() => handleCompanyClick(companyName)}>
      <img src={icon} alt={symbol} width="40" height="40" className="icon-card" />
      <div className="content-card">
        <div className="info-company">
          <span className="symbol-company">{symbol}</span>
        </div>
        <div className="info-close">
          <span className="close">{roundedClose}</span>
          <span className={`status ${statusColor}`}>{statusIcon}</span>
        </div>
      </div>
    </div>
  );
};

const StockTiles = () => {
  const [apiData, setApiData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    // Replace 'yourApiEndpoint' with the actual endpoint to fetch data from your API
    const apiEndpoint = 'https://stockpredictor-backend-urtjok3rza-wl.a.run.app/dashboard/stockcard_data';

    // Fetch data from the API
    fetch(apiEndpoint)
      .then((response) => response.json())
      .then((data) => setApiData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <>
      <h1 className='head-text'>Currently Popular</h1>


      <div className="app">

        {apiData &&
          Object.entries(apiData).map(([companyName, companyData]) => (
            <Card key={companyName} data={companyData[companyData.length - 1]} companyName={companyName} navigate={navigate} />//add array size -1
          ))}



      </div>
    </>

  );
};

export default StockTiles;