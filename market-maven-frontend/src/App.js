import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from './Navbar/Navbar';
import { Navbar, Nav, Card } from 'react-bootstrap';
import React, { useState, useEffect, useRef } from 'react'; import axios from 'axios';
import NewsCard from './Newscard/NewsCard.js';
import NewsSection from './NewsSection/NewsSection';
import StockSection from './StockSection/StockSection';
import Footer from "./Footer/Footer";
import StockTiles from './StockTiles/StockTiles'
import { Link, useNavigate } from 'react-router-dom';



function App() {
  const texts = [
    'independent investors.',
    'professional investor.',
    'student investor.',
    'every investor.',
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentText, setCurrentText] = useState(texts[0]);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime((prevElapsedTime) => prevElapsedTime + 2000);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (elapsedTime < 5000) {
      setCurrentText(texts[currentIndex]);
    } else {
      setTimeout(() => {
        setCurrentText(texts[texts.length - 1]); // Show the last text
      }, 2000); // Slow transition to the last text
    }

    if (elapsedTime >= 6000) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % (texts.length - 1));
      setElapsedTime(2000); // Restart the timer for the loop
    }
  }, [elapsedTime, currentIndex]);

  const [searchValueBody, setSearchValueBody] = useState(''); // State for the body search bar
  const [showDropdownBody, setShowDropdownBody] = useState(false); // State for dropdown visibility
  const [dropdownDataBody, setDropdownDataBody] = useState([]); // State for dropdown data
  const [isSearchModeBody, setIsSearchModeBody] = useState(false); // State to track search mode
  const [isDataLoadedBody, setIsDataLoadedBody] = useState(false); // State to track data loading
  const searchRef = useRef(); // Reference to the search bar element

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const fetchData = async () => {
    try {
      if (searchValueBody === '') {
        setIsSearchModeBody(false);
        setShowDropdownBody(true);
        const response = await axios.get(
          'https://stockpredictor-backend-urtjok3rza-wl.a.run.app/dashboard/stockcard_data'
        );
        const data = response.data;
        const ninthDayData = Object.entries(data).map(([company, companyData]) => {
          const companyInfo = companyData[companyData.length - 1];
          return {
            ...companyInfo,
            name: company,
          };
        });
        setDropdownDataBody(ninthDayData);
        setIsDataLoadedBody(true); // Set data loaded to true when API call is completed
      } else {
        setIsSearchModeBody(true);
        const response = await axios.get(
          `https://stockpredictor-backend-urtjok3rza-wl.a.run.app/dashboard/partial_search?search_term=${searchValueBody}`
        );
        const data = response.data;
        const searchResults = Object.values(data).map((result) => ({
          symbol: result.Symbol,
          name: result.CompanyName,
          icon: result.logo,
        }));
        setDropdownDataBody(searchResults);
        setIsDataLoadedBody(true); // Set data loaded to true when API call is completed
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsDataLoadedBody(true); // Set data loaded to true even in case of an error
    }
  };

  const handleSearch = () => {
    fetchData();
  };

  const handleOnFocus = () => {
    fetchData();
  };

  const handleOutsideClick = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      if (
        !event.target.classList.contains('search-bar') &&
        !event.target.closest('.body-dropdown-card')
      ) {
        setShowDropdownBody(false);
      }
    }
  };

  const renderStatusTriangle = (status) => {
    if (status === 'Increased') {
      return <div className="triangle green-triangle"></div>;
    } else if (status === 'Decreased') {
      return <div className="triangle red-triangle"></div>;
    }
    return null;
  };

  const navigate = useNavigate();

  const handleCompanyClickBody = (companyName) => {
    navigate(`/stockdetails/${companyName}`);
  };


  const renderDropdownCardBody = () => {
    return (
      <>
        <div
          className={`body-dropdown-backdrop ${showDropdownBody ? 'show' : ''}`}
          onClick={() => setShowDropdownBody(false)}
        ></div>
        <Card className={`body-dropdown-card ${showDropdownBody ? 'show' : ''}`}>
          <Card.Header>Stock Information</Card.Header>
          <Card.Body>
            <div className="body-scrollable-dropdown">
              {isDataLoadedBody && isSearchModeBody && dropdownDataBody.length === 0 && (
                <div className="no-results-text">No results found.</div>
              )}

              {isDataLoadedBody && !isSearchModeBody && dropdownDataBody.length === 0 && (
                <div className="loading-spinner">
                  <div className="spinner"></div>
                  <div className="loading-text">Fetching data...</div>
                </div>
              )}
              {!isDataLoadedBody && (
                <div className="loading-spinner">
                  <div className="spinner"></div>
                  <div className="loading-text">Fetching data...</div>
                </div>
              )}
              {isDataLoadedBody &&
                dropdownDataBody.map((company, index) => (
                  <Link
                    className="Link-text"
                    key={index}
                    to={`/stockpage/${company.name}`}
                    onClick={() => handleCompanyClickBody(company.name)}
                  >
                    <div className="body-stock-info">
                      {company.icon && (
                        <img
                          src={company.icon}
                          className="body-stock-logo"
                          alt="Company Icon"
                        />
                      )}
                      <div className="body-stock-details">
                        <p>{`${company.symbol} - ${company.name}`}</p>
                      </div>
                      <p>{company.Close}</p>
                      <div className="status-nav">
                        {renderStatusTriangle(company.Status)}
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </Card.Body>
        </Card>
      </>
    );
  };


  return (
    <div className="App">
      <NavBar />
      <div className="hero-section">
        <div className="heading-text">
          <h1 className="nonTimed-text">Powerful insights for</h1>
          <h1 className="timed-text">{currentText}</h1>
        </div>
        <div className='search-container-body'>
          <div className="body-search-bar " ref={searchRef}>
            <input
              type="text"
              placeholder="Navigate to financial world..."
              value={searchValueBody}
              onChange={(e) => setSearchValueBody(e.target.value)}
              onKeyUp={handleSearch}
              onFocus={handleOnFocus}
            />
            <i className="fas fa-search"></i>
          </div>
        </div>
        {showDropdownBody && renderDropdownCardBody()} {/* Render the dropdown card */}
      </div>

      <StockTiles />
      <StockSection />
      <NewsSection />
      <Footer/>
    </div>
  );
}

export default App;

