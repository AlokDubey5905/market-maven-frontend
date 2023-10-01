import React from "react";
import "./trendingSector.css";

const ImageGallery = () => {
    const images = [
        "/assets/sector/it-sector.avif",
        "/assets/sector/agriculture-sector.webp",
        "/assets/sector/energy.jpg",
        "/assets/sector/health-care.jpg",
        "/assets/sector/health-care.jpg"
    ];

    return (
        <div className="image-gallery">
            <div className="header">
                <h2>Trending Sectors</h2>
                <div className="sector-search-bar">
                    <input type="text" placeholder="Search ..." />
                    <i className="fas fa-search search-icon"></i>
                </div>
            </div>
            <div className="gallery">
                {images.map((image, index) => (
                    <img key={index} src={image} alt={`Image ${index + 1}`} />
                ))}
            </div>
        </div>
    );
};

export default ImageGallery;
