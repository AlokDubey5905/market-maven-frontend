import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './StockPage.css'; // Import the main CSS file for styling the layout
import StockDetails from './StockDetails/StockDetails';
import DoughnutGraph from './Analysis/Charts/DoughnutGraph';
import SentimentBarChart from './Analysis/Charts/SentimentBarChart';
import ChartLine from './Analysis/Charts/ChartLine';
import NavBar from '../Navbar/Navbar';
import News from './News/News';
import Footer from '../Footer/Footer'

const StockPage = () => {
  const [stockData, setStockData] = useState(null);
  const [sentimentData, setSentimentData] = useState(null);
  const [prediction, setPrediction] = useState('Loading prediction...');
  const [predictionColor, setPredictionColor] = useState('#ccc'); // Initialize prediction color with default color
  const { companyName } = useParams();
  const getMajoritySentiment = (ariel) => {
    const { Negative, Neutral, Positive } = ariel;



    if (Negative > Neutral && Negative > Positive) {
      return '#911f67'; // Color for majority negative sentiment
    } else if (Positive > Negative && Positive > Neutral) {
      return '#19a59c'; // Color for majority positive sentiment
    } else {
      return '#999'; // Color for majority neutral sentiment
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stockResponse = await axios.get(
          `https://stockpredictor-backend-urtjok3rza-wl.a.run.app/predict_stock/stock_details/${companyName}`
        );
        setStockData(stockResponse.data);

        const sentimentResponse = await axios.get(
          'https://stockpredictor-backend-urtjok3rza-wl.a.run.app/predict_stock/sentiment_count/'
        );
        setSentimentData(sentimentResponse.data);

        const predictionResponse = await axios.get(
          `https://stockpredictor-backend-urtjok3rza-wl.a.run.app/predict_stock/cummulative_sentiments/${companyName}`
        );
        const majoritySentiment = getMajoritySentiment(predictionResponse.data);

        setPrediction(predictionResponse.data.prediction);
        setPredictionColor(majoritySentiment);
      } catch (error) {
        console.error('Error fetching stock and sentiment data:', error);
      }
    };

    fetchData();
  }, [companyName]);


  return (
    <>
    <NavBar/>
    
    <div className="stock-page-container">
      <div className="column stock-details-column">
        {/* 1st Column: StockDetails.js */}
        {stockData && <StockDetails stockData={stockData} />}
      </div>
      <div className="column doughnut-chart-column">
        <div className="row">
    {/* 2nd Column - 1st Row: DoughnutGraph.js */}
    {sentimentData ? (
      <DoughnutGraph companyName={companyName} />
    ) : (
      <p style={{color:'whitesmoke'}}>Calculating Prediction...</p>
    )}
  </div>
        <div className="row">
        <h3 style={{color:'white',marginLeft:'-1rem'}}>{companyName} daily sentiment distribution</h3><br/>

    {/* 2nd Column - 2nd Row: SentimentBarChart.js */}
    {sentimentData ? (
      <SentimentBarChart data={sentimentData} />
    ) : (
      <p style={{color:'whitesmoke',marginTop:'5cm'}}>Collecting Sentiment Data...</p>
    )}
  </div>
      </div>
      <div className="column prediction-column">
        <div className="row">
          {/* 3rd Column - 1st Row: Prediction based on previous week */}
          <h1>
            <span className="prediction-text">Prediction based on previous week is:</span>{' '}
            <span id="prediction" style={{ color: predictionColor }}>
              {prediction}
            </span>
          </h1>
        </div>
        <div className="row">
        <h3 style={{color:'white',marginLeft:'-1rem'}}>{companyName} stock previous week forcast</h3>

          {/* 3rd Column - 2nd Row: ChartLine.js */}
          {stockData && <ChartLine companyName={companyName} />}
        </div>
      </div>
    </div>
    <div className="split-screen">
      <div className="sector-news-section"><News companyName={companyName}/></div>
    </div>
    <Footer/>
    </>
    
  );
};

export default StockPage;
