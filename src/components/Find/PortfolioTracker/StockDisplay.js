import React, { useEffect, useState, useCallback } from 'react';
import StockPriceChart from './StockPriceChart';
import Image from 'next/image';
import { Alert } from '@mantine/core';

const API_KEY = process.env.NEXT_PUBLIC_FIN_MOD_API_KEY 
const URL = process.env.NEXT_PUBLIC_BACKEND_URL 

export function StockDisplay() {
  const [portfolio, setPortfolio] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [priceData, setPriceData] = useState({ results: [] });
  const [priceDataError, setPriceDataError] = useState(false);

  const fetchStockPriceData = useCallback(async (symbol) => {
    try {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayFormatted = yesterday.toISOString().split("T")[0];

      const oneMonthAgo = new Date();
      oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);
      const oneMonthAgoFormatted = oneMonthAgo.toISOString().split("T")[0];

      const apiUrl = `https://api.polygon.io/v2/aggs/ticker/${symbol}/range/1/day/${oneMonthAgoFormatted}/${yesterdayFormatted}?adjusted=true&sort=asc&limit=120&apiKey=${process.env.NEXT_PUBLIC_POLYGON_API_KEY}`;

      const response = await fetch(apiUrl);
      const data = await response.json();
      if (!data.results || data.results.length === 0) {
        throw new Error('No price data available');
      }
      setPriceData(data);
      setPriceDataError(false);
    } catch (error) {
      console.error("Error fetching stock price data:", error);
      setPriceData({ results: [] });
      setPriceDataError(true);
    }
  }, []);

  const fetchStockProfile = async (symbol) => {
    try {
      const apiUrl = `https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${API_KEY}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (data.length === 0) {
        throw new Error('No profile data available');
      }
      return data[0];
    } catch (error) {
      console.error(`Error fetching profile data for ${symbol}:`, error);
      return null;
    }
  };

  useEffect(() => {
    const fetchPortfolioInfo = async (user) => {
      try {
        const res = await fetch(`https://www.${URL}/api/get-portfolio-info`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user }),
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const result = await res.json();
        const portfolioArray = await Promise.all(Object.keys(result).map(async (key) => {
          const profile = await fetchStockProfile(key);
          return profile ? { symbol: key, ...result[key], ...profile } : { symbol: key, ...result[key] };
        }));

        setPortfolio(portfolioArray);
        if (portfolioArray.length > 0) {
          setSelectedStock(portfolioArray[0]);
          fetchStockPriceData(portfolioArray[0].symbol);
        }
      } catch (error) {
        console.error('Error fetching portfolio info:', error);
        const guestPortfolio = JSON.parse(localStorage.getItem('guestPortfolio')) || [];
        if (!Array.isArray(guestPortfolio)) {
          setPortfolio([]);
          return;
        }
        setPortfolio(guestPortfolio);
        if (guestPortfolio.length > 0) {
          setSelectedStock(guestPortfolio[0]);
          fetchStockPriceData(guestPortfolio[0].symbol);
        }
      }
    };

    const user = JSON.parse(localStorage.getItem('user')) || 'guest';
    fetchPortfolioInfo(user);
  }, [fetchStockPriceData]);

  const handleStockClick = (stock) => {
    setSelectedStock(stock);
    fetchStockPriceData(stock.symbol);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#1e1e1e', padding: '20px', borderRadius: '10px' }}>
      <style>{`
        .stock-tab {
          display: flex;
          align-items: center;
          padding: 20px;
          background-color: #333;
          border-radius: 15px;
          margin-bottom: 15px;
          position: relative;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .stock-tab:hover {
          background-color: #444;
        }
      `}</style>
      <div style={{ flex: 1, marginRight: '20px', overflowY: 'auto' }}>
        {portfolio.map((stock) => (
          <div 
            key={stock.symbol} 
            className="stock-tab"
            onClick={() => handleStockClick(stock)}
          >
            <Image src={stock.image} alt={stock.symbol} width={50} height={50} style={{ marginRight: '20px' }} />
            <div style={{ color: '#fff' }}>
              <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{stock.companyName}</div>
              <div style={{ fontSize: '16px' }}>${stock.price ? stock.price.toFixed(2) : 'N/A'}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ flex: 3, position: 'relative', padding: '20px', backgroundColor: '#2c2c2c', borderRadius: '10px', color: '#fff', height: '50vh', overflow: 'hidden' }}>
        {selectedStock ? (
          <div style={{ height: '100%', position: 'relative' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{selectedStock.companyName}</div>
            <div style={{ fontSize: '16px', color: '#aaa' }}>NAME</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>${selectedStock.price ? selectedStock.price.toFixed(2) : 'N/A'}</div>
            <div style={{ fontSize: '16px', color: '#aaa' }}>PRICE</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>${selectedStock.mktCap ? selectedStock.mktCap.toLocaleString() : 'N/A'}</div>
            <div style={{ fontSize: '16px', color: '#aaa' }}>MARKET CAP</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>${selectedStock.volAvg ? selectedStock.volAvg.toLocaleString() : 'N/A'}</div>
            <div style={{ fontSize: '16px', color: '#aaa' }}>24H VOLUME</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: selectedStock.changes > 0 ? 'green' : 'red' }}>{selectedStock.changes ? `${selectedStock.changes}%` : 'N/A'}</div>
            <div style={{ fontSize: '16px', color: '#aaa' }}>24H CHANGE</div>
            {priceDataError ? (
              <Alert title="Error" color="red">
                Price data isn&apos;t available.
              </Alert>
            ) : (
              <StockPriceChart priceData={priceData} changeColor={selectedStock.changes > 0 ? 'green' : 'red'} />
            )}
          </div>
        ) : (
          <div>Select a stock to see details</div>
        )}
      </div>
    </div>
  );
}

export default StockDisplay;
