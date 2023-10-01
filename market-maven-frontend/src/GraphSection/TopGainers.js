import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const TableContainer = styled.div`
  margin: 20px;
  margin-top: 40px;
  color: white;
`;

const CardContainer = styled.div`
  margin: 10px 0;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background-color: #2c2f33;
  border-radius: 10px;
  transition: background-color 0.2s ease, transform 0.2s ease;
  cursor: pointer;
  &:hover {
    background-color: #1f2225;
    transform: scale(1.05); /* Zoom in effect */
  }
`;

const CompanyLogo = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CompanyName = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: #ffffff;
`;

const StockSymbol = styled.span`
  font-size: 18px;
  font-weight:900;

  color: #cccccc;
`;

const Sentiment = styled.span`
  font-size: 18px;
  font-weight:900;

  color: ${({ sentiment }) =>
    sentiment === 'Positive' ? '#19a59c' : sentiment === 'Negative' ? '#911f67' : '#999'};
`;

const Heading = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  font-weight:900;
  color: #ffffff;
`;

const TopGainers = ({ sector }) => {
  const [csvData, setCsvData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const csvResponse = await axios.get(
          `https://stockpredictor-backend-urtjok3rza-wl.a.run.app/sector/top_gainer/${sector}`
        );
        setCsvData(csvResponse.data);
      } catch (error) {
        console.error('Error fetching stock and sentiment data:', error);
      }
    };
    fetchData();
  }, [sector]);
  const navigate = useNavigate();

  const handleCompanyClick = (companyName) => {
    navigate(`/stockdetails/${companyName}`);
  };
  return (
    <TableContainer >
      <Heading>Key players in {sector}</Heading>
      {csvData.map((item) => (
         <Link
         className="Link-text"
         key={item}
         to={`/stockpage/${item['Company Name']}`}
         onClick={() => handleCompanyClick(item['Company Name'])}
       >
        <CardContainer key={item['Stock Symbol']}>
          <CompanyLogo
            src={`https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/${item['Stock Symbol']}.svg`}
            alt={`${item['Stock Symbol']} Logo`}
          />
          <CardInfo>
            <CompanyName>{item['Company Name']}</CompanyName>
            <StockSymbol>{item['Stock Symbol']}</StockSymbol>
            <Sentiment sentiment={item['sentiment']}>{item['sentiment']}</Sentiment>
          </CardInfo>
        </CardContainer>
        </Link>
      ))}
    </TableContainer>
  );
};

export default TopGainers;
