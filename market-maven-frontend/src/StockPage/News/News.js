import React, { useState, useEffect } from "react";
import NewsCard from "./NewsCard";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


const News = ({ companyName }) => {
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
    const otherNews = newsData.slice(1, 7); // Get first 6 news (excluding the main news)
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
    const navigate = useNavigate();
    const handleSeeMoreClick = (companyName) => {
        navigate(`/completeStockNews/${companyName}`);
      };
    return (
        <div className="sector-news-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 className="analysis-trending-news-heading">Trending News</h2>
                <Link
                    className="Link-text"
                    to={`/completeStockNews/${companyName}`}
                    onClick={() => handleSeeMoreClick(companyName)}
                  >
                <a className="see-more-link">See More</a>
                </Link>
            </div>

            <div className="other-sector-news-container" style={{ marginLeft: '1.5cm', marginRight: '1cm' }}>
                {otherNews.map((news, index) => (
                    <NewsCard key={index} news={news} />
                ))}
            </div>
        </div>
    );
};

export default News;
