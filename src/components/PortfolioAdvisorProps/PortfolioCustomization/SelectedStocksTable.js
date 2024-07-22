import React, { useState, useEffect, useCallback } from 'react';
import { Table, Button, Group, Image, Anchor, Modal } from '@mantine/core';
import styles from './TickerSearch.module.css';
import StockPriceChart from './PriceChart';

export function SelectedStocksTable({ selectedTicker }) {
  const [selectedStocks, setSelectedStocks] = useState([]);
  const [opened, setOpened] = useState(false);
  const [currentStock, setCurrentStock] = useState(null);
  const [priceData, setPriceData] = useState({ results: [] });

  const fetchStockPriceData = useCallback(async (symbol) => {
    try {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayFormatted = yesterday.toISOString().split('T')[0];

      const oneMonthAgo = new Date();
      oneMonthAgo.setDate(yesterday.getDate() - 30);
      const oneMonthAgoFormatted = oneMonthAgo.toISOString().split('T')[0];

      const apiUrl = `https://api.polygon.io/v2/aggs/ticker/${symbol}/range/1/day/${oneMonthAgoFormatted}/${yesterdayFormatted}?adjusted=true&sort=asc&limit=120&apiKey=${process.env.NEXT_PUBLIC_POLYGON_API_KEY}`;

      const response = await fetch(apiUrl);
      const data = await response.json();
      setPriceData(data);
    } catch (error) {
      console.error('Error fetching stock price data:', error);
    }
  }, []);

  const loadPortfolio = useCallback(async () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      loadGuestPortfolio();
      return;
    }

    try {
      const portfolioData = await fetchPortfolioInfo(user);
      const stockDetailsPromises = Object.keys(portfolioData).map(fetchStockDetails);
      const stockDetails = await Promise.all(stockDetailsPromises);
      setSelectedStocks(stockDetails.filter(stock => stock !== null));
    } catch (error) {
      console.error('Error fetching portfolio info:', error);
    }
  }, []);

  useEffect(() => {
    if (currentStock) {
      fetchStockPriceData(currentStock.symbol);
    }
  }, [currentStock, fetchStockPriceData]);

  useEffect(() => {
    loadPortfolio();
  }, [loadPortfolio]);

  const fetchStockDetails = useCallback(async (symbol) => {
    try {
      const response = await fetch(`https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${process.env.NEXT_PUBLIC_FIN_MOD_API_KEY}`);
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
  }, []);

  const fetchAndAddStockDetails = useCallback(async (symbol) => {
    try {
      const data = await fetchStockDetails(symbol);
      if (data) {
        setSelectedStocks((prevStocks) => {
          const updatedStocks = [...prevStocks, data];
          localStorage.setItem('guestPortfolio', JSON.stringify(updatedStocks));
          return updatedStocks;
        });
      }
    } catch (error) {
      console.error('Error occurred during API request:', error);
      saveToLocalStorage({ symbol });
    }
  }, [fetchStockDetails]);

  useEffect(() => {
    if (selectedTicker) {
      fetchAndAddStockDetails(selectedTicker.symbol);
    }
  }, [selectedTicker, fetchAndAddStockDetails]);

  const fetchPortfolioInfo = async (user) => {
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
    return result;
  };

  const handleRemove = async (stock) => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      removeFromLocalStorage(stock);
      return;
    }

    const payload = {
      stock,
      user
    };

    try {
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
      setSelectedStocks((prevStocks) => {
        const updatedStocks = prevStocks.filter(s => s.symbol !== stock.symbol);
        localStorage.setItem('guestPortfolio', JSON.stringify(updatedStocks));
        return updatedStocks;
      });
    } catch (error) {
      console.error('Error occurred during API request:', error);
      removeFromLocalStorage(stock);
    }
  };

  const saveToLocalStorage = (ticker) => {
    let guestPortfolio = JSON.parse(localStorage.getItem('guestPortfolio')) || [];
    guestPortfolio.push(ticker);
    localStorage.setItem('guestPortfolio', JSON.stringify(guestPortfolio));
    setSelectedStocks(guestPortfolio);
  };

  const removeFromLocalStorage = (stock) => {
    let guestPortfolio = JSON.parse(localStorage.getItem('guestPortfolio')) || [];
    guestPortfolio = guestPortfolio.filter(s => s.symbol !== stock.symbol);
    localStorage.setItem('guestPortfolio', JSON.stringify(guestPortfolio));
    setSelectedStocks(guestPortfolio);
  };

  const loadGuestPortfolio = () => {
    const guestPortfolio = JSON.parse(localStorage.getItem('guestPortfolio')) || [];
    setSelectedStocks(guestPortfolio);
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
        size="70%"
      >
        <StockPriceChart priceData={priceData} />
        {currentStock && (
          <div>
            <p><strong>Symbol: </strong> {currentStock.symbol}</p>
            <p><strong>Price: </strong>${currentStock.price}</p>
            <p><strong>Industry: </strong> {currentStock.industry}</p>
            <p><strong>Description: </strong><br />{currentStock.description}</p>
          </div>
        )}
      </Modal>

      <Table className={styles.table}>
        <tbody>
          {selectedStocks.map((stock) => (
            <tr key={stock.symbol}>
              <td><Image src={stock.image || 'default-image.png'} alt={`${stock.companyName || 'N/A'} logo`} width={50} /></td>
              <td>
                <Anchor href={stock.website || '#'} target="_blank" rel="noopener noreferrer" className={styles.companyLink}>
                  {stock.companyName || 'N/A'}
                </Anchor>
              </td>
              <td>${stock.price !== undefined ? stock.price : 'N/A'}</td>
              <td>{stock.industry || 'N/A'}</td>
              <td>
                <Group justify="center">
                  <Button color="red" size="compact-md" onClick={() => handleRemove(stock)}>Remove</Button>
                  <Button variant="gradient" gradient={{ from: 'violet', to: 'blue', deg: 153 }} size="compact-md" onClick={() => handleViewStats(stock)}>View Stats</Button>
                </Group>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
