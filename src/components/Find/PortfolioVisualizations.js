import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';

const API_KEY = process.env.NEXT_PUBLIC_FIN_MOD_API_KEY; // Replace this with your actual API key

const PortfolioVisualizations = () => {
  const [portfolio, setPortfolio] = useState([]);

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
        const res = await fetch('http://localhost:5000/api/get-portfolio-info', {
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
      } catch (error) {
        console.error('Error fetching portfolio info:', error);
        const guestPortfolio = JSON.parse(localStorage.getItem('guestPortfolio')) || [];
        if (!Array.isArray(guestPortfolio)) {
          setPortfolio([]);
          return;
        }
        setPortfolio(guestPortfolio);
      }
    };

    const user = JSON.parse(localStorage.getItem('user')) || 'guest';
    fetchPortfolioInfo(user);
  }, []);

  const sectorProportions = portfolio.reduce((acc, stock) => {
    if (acc[stock.sector]) {
      acc[stock.sector] += stock.price;
    } else {
      acc[stock.sector] = stock.price;
    }
    return acc;
  }, {});

  const data = {
    labels: Object.keys(sectorProportions),
    datasets: [
      {
        data: Object.values(sectorProportions),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#FF5733',
          '#C70039',
          '#900C3F',
          '#581845',
          '#8E44AD',
          '#2980B9',
          '#27AE60',
          '#F1C40F',
          '#E67E22',
        ],
      },
    ],
  };

  return (
    <div style={{ width: '50%', margin: 'auto' }}>
      <h2 style={{ textAlign: 'center', color: '#fff' }}>Portfolio Sector Proportions</h2>
      <Pie data={data} />
    </div>
  );
};

export default PortfolioVisualizations;
