import React, { useState, useEffect } from "react";
import SectorNewsCard from "../../SectorNews/SectorNewsCard";
import axios from "axios";
import { useParams } from "react-router-dom";
import './CompleteStockNews.css'
import NavBar from "../../Navbar/Navbar";
import Footer from '../../Footer/Footer'




const SectorNewsSection = () => {
    const { companyName } = useParams();

    console.log(companyName)
    const [newsData, setNewsData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const newsResponse = await axios.get(
                    `https://stockpredictor-backend-urtjok3rza-wl.a.run.app/predict_stock/stock_news/${companyName}`
                  );
                  setNewsData(newsResponse.data);
            } catch (error) {
                console.error('Error fetching stock and sentiment data:', error);
              }
            };
            fetchData();

    }, [companyName]);

    const mainNews = newsData.length > 0 ? newsData[0] : null;
    const otherNews = newsData.slice(1, 22); // Get first 20 news (excluding the main news)
    const getSentimentColor = () => {
        switch (mainNews.sentiment) {
            case "positive":
                return "green";
            case "negative":
                return "red";
            case "neutral":
                return "blue";
            default:
                return "gray";
        }
    };

    return (
        <>
        <NavBar/>
        <div className="complete-news-section">
            <h2 className="complete-trending-news-heading">Trending News</h2>
            {mainNews && (
                <a href={mainNews.url} target="_blank" rel="noopener noreferrer" className="complete-main-news-card">
                    <img src={mainNews.urlToImage} alt={mainNews.headline} className="complete-main-news-image" />
                    <div className="complete-main-news-content">
                        <div className="sentiment-dot-container">
                            <div className={`sentiment-dot ${getSentimentColor()}`}></div>
                        </div>
                        <h2 className="complete-main-news-headline">{mainNews.headline}</h2>
                        <p className="complete-main-news-description">{mainNews.description}</p>
                        <p className="complete-main-news-datetime">{mainNews.datetime}</p>
                    </div>
                </a>
            )}


            <div className="other-complete-news-container">
                {otherNews.map((news, index) => (
                    <SectorNewsCard key={index} news={news} />
                ))}
            </div>
        </div>
        <Footer/>
        </>
        
    );
};

export default SectorNewsSection;
