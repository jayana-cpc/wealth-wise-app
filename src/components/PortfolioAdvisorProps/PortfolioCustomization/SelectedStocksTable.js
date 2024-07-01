import React, { useState, useEffect } from 'react';
import styles from './TickerSearch.module.css';

export function SelectedStocksTable({ selectedTicker }) {
  const [selectedStocks, setSelectedStocks] = useState([]);

  useEffect(() => {
    if (selectedTicker) {
      const fetchStockDetails = async () => {
        try {
          const response = await fetch(`https://financialmodelingprep.com/api/v3/profile/${selectedTicker.symbol}?apikey=01e4bab5bf0732e8f24a4de466b692bb`);
          if (response.ok) {
            const data = await response.json();
            setSelectedStocks((prevStocks) => [...prevStocks, data[0]]);
          } else {
            console.error('Error fetching stock details');
          }
        } catch (error) {
          console.error('Error occurred during API request:', error);
        }
      };

      fetchStockDetails();
    }
  }, [selectedTicker]);

  const handleRemove = (symbol) => {
    setSelectedStocks((prevStocks) => prevStocks.filter(stock => stock.symbol !== symbol));
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Logo</th>
          <th>Company</th>
          <th>Price</th>
          <th>Industry</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {selectedStocks.map((stock) => (
          <tr key={stock.symbol}>
            <td><img src={stock.image} alt={`${stock.companyName} logo`} width="50" /></td>
            <td>
              <a href={stock.website} target="_blank" rel="noopener noreferrer" className={styles.companyLink}>
                {stock.companyName}
              </a>
            </td>
            <td>{stock.price}</td>
            <td>{stock.industry}</td>
            <td><button className={styles.removeButton} onClick={() => handleRemove(stock.symbol)}>Remove</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}