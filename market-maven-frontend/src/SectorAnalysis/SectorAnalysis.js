import React from "react";
import "./SectorAnalysis.css";
import SectorNewsSection from "../SectorNews/SectorNewsSection";
import NavBar from "../Navbar/Navbar";
import GraphSection from "../GraphSection/GraphSection";
import { useParams } from 'react-router-dom';
import Footer from "../Footer/Footer";
import healthCare from '../Navbar/sector/healthCare.jpg';
import energy from '../Navbar/sector/energy.png';
import communicationService from '../Navbar/sector/communicationService.png';
import consumerDiscretionary from '../Navbar/sector/consumerDiscretionary.webp';
import consumerStaples from '../Navbar/sector/consumerStaples.png';
import financials from '../Navbar/sector/financials.jpg';
import industrial from '../Navbar/sector/industrial.jpg';
import informationTechnology from '../Navbar/sector/informationTechnology.jpg';
import material from '../Navbar/sector/material.jpg';
import realEstate from '../Navbar/sector/realEstate.jpg';
import utilities from '../Navbar/sector/utilities.png';

const sectorImages = {
  'Health Care': healthCare,
  'Energy': energy,
  'Communication Services': communicationService,
  'Consumer Discretionary': consumerDiscretionary,
  'Consumer Staples': consumerStaples,
  'Financials': financials,
  'Industrials': industrial,
  'Information Technology': informationTechnology,
  'Materials': material,
  'Real Estate': realEstate,
  'Utilities': utilities,
};
const SectorAnalysis = () => {

const { sector } = useParams();
  return (
    <div>
    
    <NavBar/>
    <div className="split-screen">
      
      <div className="sector-news-section">
      <span className="sector-heading-container">
  <img className="sector-logo-img" src={sectorImages[sector]} alt={sector} />
  <p className="heading-logo">{sector}</p>
</span>       
        <SectorNewsSection sector={sector}/></div>
      <div className="sector-graph-section"><GraphSection sector={sector}/></div>
    </div>
    <Footer/>
    </div>
   
  );
};

export default SectorAnalysis;