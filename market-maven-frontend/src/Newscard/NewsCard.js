import React from 'react';
import './NewsCard.css';

const NewsCard = ({ news }) => {
  const { category, datetime, headline, id, image, related, source, summary, url } = news;

  // Function to handle the card click and redirect to the URL
  const handleCardClick = () => {
    window.open(url, '_blank');
  };

  return (
    <div className="news-card" onClick={handleCardClick}>
      <img src={image} alt={headline} />
      <div className='info'>
        <div className='source-with-dot'>
          <div className="source-dot"></div>
          <p>{source}</p>
        </div>
        <p>{datetime}</p>
      </div>
      <h2>{headline}</h2>
      <p className="news-summary">{summary}</p>
    </div>
  );
};

export default NewsCard;