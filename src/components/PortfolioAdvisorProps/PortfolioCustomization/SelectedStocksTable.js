import React, { useState, useEffect } from 'react';
import { Table, Button, Group, Image, Anchor, Modal } from '@mantine/core';
import styles from './TickerSearch.module.css';

export function SelectedStocksTable({ selectedTicker }) {
  const [selectedStocks, setSelectedStocks] = useState([]);
  const [opened, setOpened] = useState(false);
  const [currentStock, setCurrentStock] = useState(null);

  useEffect(() => {
    async function fetchAndSetPortfolio() {
      const user = JSON.parse(localStorage.getItem('user'));
      console.info("User data from localStorage:", user);

      if (!user) {
        console.error("User data is missing from localStorage.");
        return;
      }

      try {
        const portfolioData = await fetchPortfolioInfo(user);

        const stockDetailsPromises = Object.keys(portfolioData).map(ticker => fetchStockDetails(ticker));
        const stockDetails = await Promise.all(stockDetailsPromises);

        setSelectedStocks(stockDetails.filter(stock => stock !== null));
      } catch (error) {
        console.error('Error fetching portfolio info:', error);
      }
    }

    fetchAndSetPortfolio();
  }, []);

  useEffect(() => {
    if (selectedTicker) {
      const fetchStockDetailsForTicker = async () => {
        try {
          const data = await fetchStockDetails(selectedTicker.symbol);
          if (data) {
            setSelectedStocks((prevStocks) => [...prevStocks, data]);
          }
        } catch (error) {
          console.error('Error occurred during API request:', error);
        }
      };

      fetchStockDetailsForTicker();
    }
  }, [selectedTicker]);

  const fetchPortfolioInfo = async (user) => {
    console.info("User data sent to fetchPortfolioInfo:", user);

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
    console.log("the portfolio:", result);
    return result;
  };

  const fetchStockDetails = async (symbol) => {
    try {
      const response = await fetch(`https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=01e4bab5bf0732e8f24a4de466b692bb`);
      if (!response.ok) {
        throw new Error('Error fetching stock details');
      }
      const data = await response.json();
      if (data && data[0]) {
        return data[0];
      } else {
        console.error('Invalid data format from API');
        return null;
      }
    } catch (error) {
      console.error('Error fetching stock details:', error);
      return null;
    }
  };

  const handleRemove = async (stock) => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      throw new Error("User not found in local storage");
    }

    const payload = {
      stock,
      user
    };

    const res = await fetch('http://localhost:5000/api/delete-portfolio-info', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const result = await res.json();
    console.log(result);

    setSelectedStocks((prevStocks) => prevStocks.filter(s => s.symbol !== stock.symbol));
    console.log("selectedStocks: ", selectedStocks)
  };

  const handleViewStats = (stock) => {
    setCurrentStock(stock);
    setOpened(true);
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={currentStock ? currentStock.companyName : 'Stock Stats'}

      >
        {/* Modal content, e.g., stock details */}
        {currentStock && (
          <div>

            <p><strong>Symbol:</strong> {currentStock.symbol}</p>
            <p><strong>Price:</strong>${currentStock.price}</p>
            <p><strong>Industry:</strong> {currentStock.industry}</p>
            <p><strong>Description:</strong><br />{currentStock.description}</p>          
          </div>
        )}
      </Modal>

      <Table className={styles.table}>
        <thead>
          <tr>
            <th>Logo</th>
            <th>Company</th>
            <th>Price</th>
            <th>Industry</th>
            <th className={styles.actionsColumn}>Action</th>
          </tr>
        </thead>
        <tbody>
          {selectedStocks.map((stock) => (
            <tr key={stock.symbol}>
              <td><Image src={stock.image || 'default-image.png'} alt={`${stock.companyName || 'N/A'} logo`} width={50} /></td>
              <td>
                <Anchor href={stock.website || '#'} target="_blank" rel="noopener noreferrer" className={styles.companyLink}>
                  {stock.companyName || 'N/A'}
                </Anchor>
              </td>
              <td>{stock.price !== undefined ? stock.price : 'N/A'}</td>
              <td>{stock.industry || 'N/A'}</td>
              <td>
                <Group spacing="xs">
                  <Button color="red" onClick={() => handleRemove(stock)}>Remove</Button>
                  <Button color="blue" onClick={() => handleViewStats(stock)}>View Stats</Button>
                </Group>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}