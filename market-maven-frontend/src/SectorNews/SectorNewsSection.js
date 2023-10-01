import React, { useState, useEffect } from "react";
import SectorNewsCard from "./SectorNewsCard";
import axios from "axios";

const SectorNewsSection = ({sector}) => {
    const [newsData, setNewsData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const newsResponse = await axios.get(
                    `https://stockpredictor-backend-urtjok3rza-wl.a.run.app/sector/sector_news/${sector}`
                  );
                  console.log(newsResponse.data);
                  setNewsData(newsResponse.data);
                  
            } catch (error) {
                console.error('Error fetching stock and sentiment data:', error);
              }
            };
            fetchData();

    }, [sector]);

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
    const handleImageError = (e) => {
        console.log("Image error occurred.");
        console.log("naturalWidth:", e.currentTarget.naturalWidth);
        console.log("naturalHeight:", e.currentTarget.naturalHeight);
        
      e.currentTarget.src = "/assets/fallback.png"; // Set the fallback image URL here
      e.currentTarget.onerror = null; // Prevent recursive calls if the fallback image also fails
    
     
    
      };
    return (
        <div className="sector-news-section">
            {mainNews && (
                <a href={mainNews.url} target="_blank" rel="noopener noreferrer" className="sector-main-news-card">
         {mainNews.urlToImage ? (
        <img
          src={mainNews.urlToImage}
          alt={mainNews.headline}
          className="sector-main-news-image"
          onError={handleImageError}
        />
      ) : (
        <img
          src="/assets/fallback.png"
          alt="Fallback Image"
          className="sector-main-news-image"
        />
      )}
                    <div className="sector-main-news-content">
                        <div className="sentiment-dot-container">
                            <div className={`sentiment-dot ${getSentimentColor()}`}></div>
                        </div>
                        <h2 className="sector-main-news-headline">{mainNews.headline}</h2>
                        <p className="sector-main-news-description">{mainNews.description}</p>
                        <p className="sector-main-news-datetime">{mainNews.datetime}</p>
                    </div>
                </a>
            )}

            <h2 className="sector-trending-news-heading">Trending News</h2>

            <div className="other-sector-news-container">
                {otherNews.map((news, index) => (
                    <SectorNewsCard key={index} news={news} />
                ))}
            </div>
        </div>
    );
};

export default SectorNewsSection;
