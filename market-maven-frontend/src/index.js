import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import StockPage from './StockPage/StockPage';
import Aboutus from './Aboutus/Aboutus'
import SectorAnalysis from './SectorAnalysis/SectorAnalysis';
import CompleteStockNews from './StockPage/News/CompleteStockNews'


ReactDOM.render(
  <BrowserRouter>
 
      <Routes>
        <Route path="/" element={<App />} />

        <Route path="/stockpage/:companyName" element={<StockPage/>} />
        <Route path="/sectorAnalysis/:sector" element={<SectorAnalysis/>} />

        <Route path="/aboutUs" element={<Aboutus/>} />
        <Route path="/completeStockNews/:companyName" element={<CompleteStockNews/>} />


      </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

reportWebVitals();
