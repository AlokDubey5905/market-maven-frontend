// StockDetails.js
import React from 'react';
import './StockDetails.css'; // Import the CSS file

const StockDetails = ({ stockData }) => {
  return (
    <div>
      <table>
        <tbody className="body-color">
          <tr>
            <td className="nameTickerCell">
              {stockData.name} (<span>{stockData.ticker}</span>)
            </td>
            <td className="logoCell">
              <img className="logo-table" src={stockData.logo} alt="Company Logo" />
            </td>
          </tr>
          <tr>
            <td colSpan="2" className="divider-table"></td>
          </tr>
          <tr>
            <td className="dataCell">Name:</td>
            <td className="dataCellRightAlign">{stockData.name}</td>
          </tr>
          <tr>
            <td className="dataCell">Ticker:</td>
            <td className="dataCellRightAlign">{stockData.ticker}</td>
          </tr>
          <tr>
            <td className="dataCell">Phone:</td>
            <td className="dataCellRightAlign">{stockData.phone}</td>
          </tr>
          <tr>
            <td className="dataCell">Web URL:</td>
            <td className="dataCellRightAlign">
              <a href={stockData.weburl} target="_blank" rel="noopener noreferrer">
                {stockData.weburl}
              </a>
            </td>
          </tr>
          <tr>
            <td className="dataCell">IPO:</td>
            <td className="dataCellRightAlign">{stockData.ipo}</td>
          </tr>
          <tr>
            <td className="dataCell">Country:</td>
            <td className="dataCellRightAlign">{stockData.country}</td>
          </tr>
          <tr>
            <td className="dataCell">Currency:</td>
            <td className="dataCellRightAlign">{stockData.currency}</td>
          </tr>
          <tr>
            <td className="dataCell">Exchange:</td>
            <td className="dataCellRightAlign">{stockData.exchange}</td>
          </tr>  

          <tr>
            <td className="dataCell">Industry:</td>
            <td className="dataCellRightAlign">{stockData.finnhubIndustry}</td>
          </tr>
          <tr>
            <td className="dataCell">Share Outstanding:</td>
            <td className="dataCellRightAlign">{stockData.shareOutstanding}</td>
          </tr>
          <tr>
            <td className="dataCell">Market Capitalization:</td>
            <td className="dataCellRightAlign">{stockData.marketCapitalization.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default StockDetails;
