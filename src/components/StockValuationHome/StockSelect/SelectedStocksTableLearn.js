import React, { useState, useEffect } from 'react';
import styles from '@/components/PortfolioAdvisorProps/PortfolioCustomization/TickerSearch.module.css';
import { Group, Button, Modal } from '@mantine/core';
import { useRouter } from 'next/navigation';

export function SelectedStocksTable({ selectedTicker, setSelectedTicker }) {
  const [selectedStocks, setSelectedStocks] = useState([]);
  const [opened, setOpened] = useState(false);
  const [currentStock, setCurrentStock] = useState(null);
  const [analyzeMessage, setAnalyzeMessage] = useState('');
  const router = useRouter();
  const handleButtonClick = () => {
    router.push('/learn/stockValuation/understandingBusiness');
  };
  useEffect(() => {
    if (selectedTicker) {
      const fetchStockDetails = async () => {
        try {
          const response = await fetch(`https://financialmodelingprep.com/api/v3/profile/${selectedTicker.symbol}?apikey=01e4bab5bf0732e8f24a4de466b692bb`);
          if (response.ok) {
            const data = await response.json();
            setSelectedStocks([data[0]]); // Ensure only one stock is added
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

  const handleViewStats = (stock) => {
    setCurrentStock(stock);
    setOpened(true);
  };

  const handleAnalyzeStock = () => {
    if (selectedStocks.length > 0) {
      localStorage.setItem('userStock', selectedStocks[0].symbol);
      setAnalyzeMessage(`${selectedStocks[0].symbol} is ready to analyze! `);
    }
  };

  return (
    <div className={styles.container}>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={currentStock ? currentStock.companyName : 'Stock Stats'}
      >
        {currentStock && (
          <div>
            <p><strong>Symbol: </strong> {currentStock.symbol}</p>
            <p><strong>Price: </strong>${currentStock.price}</p>
            <p><strong>Industry: </strong> {currentStock.industry}</p>
            <p><strong>Description: </strong><br />{currentStock.description}</p>
          </div>
        )}
      </Modal> 
      <table className={styles.table}>
        <tbody>
          {selectedStocks.map((stock) => (
            <tr key={stock.symbol}>
              <td><img src={stock.image} alt={`${stock.companyName} logo`} width="50" /></td>
              <td>
                <a href={stock.website} target="_blank" rel="noopener noreferrer" className={styles.companyLink}>
                  {stock.companyName}
                </a>
              </td>
              <td>${stock.price}</td>
              <td>{stock.industry}</td>
              <td>
                <Group justify="center">
                  <Button variant="gradient" gradient={{ from: 'violet', to: 'blue', deg: 153 }} size="compact-md" onClick={() => handleViewStats(stock)}>View Stats</Button>
                </Group>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedStocks.length > 0 && (
        <Group justify="center" className={styles.analyzeButtonGroup}>
          <Button variant="outline" size="compact-md" onClick={handleAnalyzeStock}>Analyze Stock</Button>
        </Group>
      )}
      {analyzeMessage && (
        <div className={styles.analyzeMessage}>
          <p>{analyzeMessage}</p>
          <Button variant="gradient" gradient={{ from: 'violet', to: 'blue', deg: 153 }} size="compact-md" onClick={handleButtonClick}>Continue</Button>
        </div>
      )}
    </div>
  );
}