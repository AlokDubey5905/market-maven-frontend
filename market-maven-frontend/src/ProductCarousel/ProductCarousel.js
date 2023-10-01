// ProductCarousel.js
import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./ProductCarousel.css"; // Create this file for custom styles

const ProductCarousel = () => {

    const slides = [
        {
            image: "/assets/our_product/home_page.png",
            text: "Get the realtime stock price of S&P 500 companies",
        },
        {
            image: "/assets/our_product/trending_stocks.png",
            text: "Top stocks in market investors are interested in.",
        },
        {
            image: "/assets/our_product/trending_news.png",
            text: "Trending news about the market, which can help the user make decisions.",
        },
        {
            image: "/assets/our_product/sector-page.png",
            text: "Analysis of the Sector of users choice, which can help the user make decisions",
        },
       
        {
            image: "/assets/our_product/company_page2.png",
            text: "Company profile and its semantic analysis.",
        },
        {
            image: "/assets/our_product/complete_company_news.png",
            text: "Trending News for the company.",
        },
        // Add more slides with different images and text
    ];

    const handleSlideChange = (event) => {
    };

    return (
        <div>
            <h2 className="carousel-heading">Our Product</h2>
            <AliceCarousel
                autoPlay
                autoPlayInterval={2000} // Set the interval to 2 seconds
                buttonsDisabled
                infinite
                mouseTracking
                items={slides.map((slide, index) => (
                    <div
                        key={index}
                        className="carousel-slide"
                    >
                        <img src={slide.image} alt={`Slide ${index + 1}`} />
                        <p className="carousel-text">{slide.text}</p>
                    </div>
                ))}
                onSlideChanged={handleSlideChange}
                fadeOutAnimation
            />
        </div>
    );
};

export default ProductCarousel;
