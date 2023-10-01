import { useState, useEffect, useRef } from 'react';
import { Navbar, Nav, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';

import styled from 'styled-components';


import healthCare from './sector/healthCare.jpg';
import energy from './sector/energy.png';
import communicationService from './sector/communicationService.png';
import consumerDiscretionary from './sector/consumerDiscretionary.webp';
import consumerStaples from './sector/consumerStaples.png';
import financials from './sector/financials.jpg';
import industrial from './sector/industrial.jpg';
import informationTechnology from './sector/informationTechnology.jpg';
import material from './sector/material.jpg';
import realEstate from './sector/realEstate.jpg';
import utilities from './sector/utilities.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';



const colors = {
  primary: '#007bff', // Adjust this color to match your app's primary color
  text: '#333',
  background: 'linear-gradient(to bottom, #ffffff, #f7f7f7)',
  hoverBackground: '#f5f5f5',
  scrollbarThumb: '#c0c0c0',
};

const SectorDropdownContainer = styled.div`
  position: absolute;
  top: 80px;
  margin-left: 89.5rem;
  width: 310px;
  background: ${colors.background};
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 15px;
  z-index: 100;
  display: ${props => (props.show ? 'block' : 'none')};
  transform-origin: top right;
  transform: ${props => (props.show ? 'scale(1)' : 'scale(0.8)')};
  opacity: ${props => (props.show ? '1' : '0')};
  transition: transform 0.2s, opacity 0.2s;
  backdrop-filter: blur(4px); /* Added a background blur effect */
  max-height: 400px; /* Set a maximum height for the card */
  overflow-y: auto; /* Make the card scrollable */ overflow: hidden auto;
  scrollbar-width: thin;
  scrollbar-color: ${colors.scrollbarThumb} ${colors.background};

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${colors.background};
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${colors.scrollbarThumb};
    border-radius: 8px;
    transition: background-color 0.2s;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: ${colors.primary};
  }
`;

const SectorList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SectorItem = styled.li`
  display: flex;
  align-items: center;
  padding: 10px 0;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.2s; /* Added transform transition */

  &:hover {
    background-color: ${colors.hoverBackground};
    transform: translateX(5px); /* Added a slight horizontal shift on hover */
  }
`;

const SectorContent = styled.div`
  display: flex;
  justify-content: space-between; /* Align content to the right */
  gap: 10px; /* Added gap between icon and text */
  width: 100%; /* Fill the available width */
`;

const SectorName = styled.span`
font-weight: bold;
color: ${colors.text}; /* Adjust text color */
white-space: nowrap; /* Prevent text from wrapping */
overflow: hidden; /* Hide overflowed text */
text-overflow: ellipsis; /* Show ellipsis (...) for overflowed text */
`;
const SectorLink = styled(Nav.Link)`
  display: flex;
  align-items: center;
  /* ... */
  .rotate {
    transition: transform 0.8s;
  }

  &:hover {
    .rotate {
      transform: rotate(360deg);
    }
  }
`;
const SectorIcon = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    animation: spin 2s linear infinite;
    transform: scale(1.1);
  }

  @keyframes spin {
    0% {
      transform: rotateY(0deg);
    }
    100% {
      transform: rotateY(360deg);
    }
  }
`;
const sectors = [
  'Health Care',
  'Industrials',
  'Information Technology',
  'Consumer Staples',
  'Consumer Discretionary',
  'Utilities',
  'Financials',
  'Materials',
  'Real Estate',
  'Communication Services',
  'Energy',
];
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
const NavBar = () => {
  const [searchValue, setSearchValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownData, setDropdownData] = useState([]);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const searchRef = useRef();
  const sectorLinkRef = useRef();
  const [showSectorDropdown, setShowSectorDropdown] = useState(false);

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const fetchData = async () => {
    try {
      if (searchValue === '') {
        setIsSearchMode(false);
        setShowDropdown(true);
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
        setDropdownData(ninthDayData);
        setIsDataLoaded(true);
      } else {
        setIsSearchMode(true);
        const response = await axios.get(
          `https://stockpredictor-backend-urtjok3rza-wl.a.run.app/dashboard/partial_search?search_term=${searchValue}`
        );
        const data = response.data;
        const searchResults = Object.values(data).map((result) => ({
          symbol: result.Symbol,
          name: result.CompanyName,
          icon: result.logo,
        }));
        setDropdownData(searchResults);
        setIsDataLoaded(true);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsDataLoaded(true);
    }
  };

  const handleSearch = () => {
    fetchData();
  };

  const handleOnFocus = () => {
    fetchData();
  };

  const handleOutsideClick = (event) => {
    if (
      searchRef.current &&
      !searchRef.current.contains(event.target) &&
      !event.target.classList.contains('sector-link')
    ) {
    }
  };

  const toggleSectorDropdown = () => {
    setShowDropdown(false);
    setShowSectorDropdown((prevState) => !prevState);
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

  const handleCompanyClick = (companyName) => {
    navigate(`/stockdetails/${companyName}`);
  };
  const handleSectorClick = (sector) => {
    navigate(`/sectorAnalysis/${sector}`);
  };

  const renderDropdownCard = () => {
    return (
      <>
        <div
          className={`dropdown-backdrop ${showDropdown ? 'show' : ''}`}
          onClick={() => setShowDropdown(false)}
        ></div>
        <Card className={`dropdown-card ${showDropdown ? 'show' : ''}`}>
          <Card.Header>Stock Information</Card.Header>
          <Card.Body>
            <div className="scrollable-dropdown">
              {isDataLoaded && isSearchMode && dropdownData.length === 0 && (
                <div className="no-results-text">No results found.</div>
              )}
             
               {isDataLoaded && !isSearchMode && dropdownData.length === 0 && (
                <div className="loading-spinner">
                  <div className="spinner"></div>
                  <div className="loading-text">Fetching data...</div>
                </div>
              )}
              {!isDataLoaded && (
                <div className="loading-spinner">
                  <div className="spinner"></div>
                  <div className="loading-text">Fetching data...</div>
                </div>
              )}
              {isDataLoaded &&
                dropdownData.map((company, index) => (
                  <Link
                    className="Link-text"
                    key={index}
                    to={`/stockpage/${company.name}`}
                    onClick={() => handleCompanyClick(company.name)}
                  >
                    <div className="stock-info">
                      {company.icon && (
                        <img
                          src={company.icon}
                          className="stock-logo"
                          alt="Company Icon"
                        />
                      )}
                      <div className="stock-details">
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
  
  const renderSectorDropdown = () => {
    return (
      <>
        <div
          className={`dropdown-backdrop ${showSectorDropdown ? 'show' : ''}`}
          onClick={() => setShowSectorDropdown(false)}
        ></div>
        <SectorDropdownContainer show={showSectorDropdown} ref={searchRef}>

          <SectorList>
            {sectors.map((sector, index) => (
              <Link
                className="Link-text"
                key={index}
                to={`/sectorAnalysis/${sector}`}
                onClick={() => handleSectorClick(sector)}
              >
                <SectorItem key={index}>
                  <SectorContent>
                    <SectorName>{sector}</SectorName>
                    <SectorIcon src={sectorImages[sector]} alt={sector} />
                  </SectorContent>

                </SectorItem>
                <div style={{ borderBottom: '1px solid #ddd', margin: '2px 0' }}></div>

              </Link>
            ))}
          </SectorList>
          {/* Add a divider after each row */}
          
        </SectorDropdownContainer>
      </>
    );
  };
  
  

  return (
    <div className="nav-container">
      {showDropdown && renderDropdownCard()}
      {showSectorDropdown && renderSectorDropdown()}
      <Navbar className="custom-navbar" expand="lg" variant="dark">
        <Navbar.Brand href="">
          <Link to={'/'}>
            <img
              src={logo}
              style={{ marginTop: '1px', height: '1cm', width: '5cm' }}
              className="stockLogo"
              alt="Logo"
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <div className="search-container">
          <div className="search-bar" ref={searchRef}>
            <input
              type="text"
              placeholder="Navigate to financial world..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyUp={handleSearch}
              onFocus={handleOnFocus}
              className="white-placeholder"
            />
            <i className="fas fa-search"></i>
          </div>
        </div>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto" style={{ marginLeft: '900px' }}>
          <SectorLink
      className="link-text-sector"
      onClick={toggleSectorDropdown}
      ref={sectorLinkRef}
    >
       <span style={{ display: 'flex', alignItems: 'center' }}>
    <span style={{ marginRight: '5px' }}>Explore</span>
    <span style={{ marginLeft: '5px' }}>Sectors</span>
    <FontAwesomeIcon icon={faAngleDown} style={{ marginLeft: '5px' }} />
  </span>
    </SectorLink>
            <Nav.Link className="link-text" href="/" style={{ marginLeft: '20px' }}>
              Home
            </Nav.Link>
            <Nav.Link className="link-text" href="/aboutUs"style={{ marginLeft: '20px' }}>
              About
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
