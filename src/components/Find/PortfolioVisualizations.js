import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';

const PortfolioVisualizations = () => {
  const [portfolio, setPortfolio] = useState([]);

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
        setPortfolio(result);
      } catch (error) {
        console.error('Error fetching portfolio info:', error);
        const guestPortfolio = JSON.parse(localStorage.getItem('guestPortfolio'));
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
