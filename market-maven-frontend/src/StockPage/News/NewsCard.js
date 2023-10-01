import React from "react";

const SectorNewsCard = ({ news }) => {
  const { headline, description, url, urlToImage, datetime, sentiment } = news;
  const getSentimentColor = () => {
    switch (sentiment) {
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
    // Function to handle image loading errors
    e.currentTarget.src = "/assets/fallback.png"; // Set the fallback image URL here
  };

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="sector-news-card">
 {urlToImage ? (
        <img
          src={urlToImage}
          alt={headline}
          className="sector-news-image"
          onError={handleImageError}
        />
      ) : (
        <img
          src="/assets/fallback.png"
          alt="Fallback Image"
          className="sector-news-image"
        />
      )}      <div className="sentiment-dot-container">
        <div className={`sentiment-dot ${getSentimentColor()}`}></div>
      </div>
      <div className="sector-news-content">
        <h3 className="sector-news-headline">{headline}</h3>
        <p className="sector-news-description">{description}</p>
        <p className="sector-news-datetime">{datetime}</p>
      </div>
    </a>
  );
};

export default SectorNewsCard;
