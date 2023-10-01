import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewsCard from '../Newscard/NewsCard';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './NewsSection.css';

const NewsSection = () => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    axios.get('https://stockpredictor-backend-urtjok3rza-wl.a.run.app/dashboard/trending_news')
      .then(response => setNewsData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const NextArrow = ({ onClick }) => (
    <div className="slick-arrow next-arrow" onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M7.707 6.293l1.414-1.414L15.414 12l-6.293 6.293-1.414-1.414L12.586 12z" />
      </svg>
    </div>
  );  return (
    <div >
      <h1 className='heading-news'>Trending News</h1>
      <div className="news-carousel">
      <Slider {...settings} nextArrow={<NextArrow />}>
          {newsData.map(news => <NewsCard key={news.id} news={news} />)}
        </Slider>
      
      </div>
    </div>
  );
};

export default NewsSection;
