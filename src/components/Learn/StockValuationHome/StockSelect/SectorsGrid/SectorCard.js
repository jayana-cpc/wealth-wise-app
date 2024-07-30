import React, { useEffect, useState, useCallback } from 'react';
import { Title, Text, Space, Group, Avatar, Alert, Skeleton } from '@mantine/core';
import axios from 'axios';
import CompanyTable from './CompanyTable';
import SectorProsAndCons from './SectorProsAndCons';
import styles from './SectorCard.module.css';

// Use process.env to access the environment variable directly
const apiKey = process.env.NEXT_PUBLIC_FIN_MOD_API_KEY;
const cacheKeyPrefix = 'sectorStockData_';

const SectorCard = ({ sectorName, description, pros, cons, stockSymbols, icon }) => {
  const [stocks, setStocks] = useState([]);
  const [opened, setOpened] = useState(false);
  const [currentStock, setCurrentStock] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Remove 'apiKey' from the dependency array
  const fetchStockData = useCallback(
    async (symbol, retries = 3, delay = 1000) => {
      try {
        const response = await axios.get(`https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${apiKey}`);
        return response.data[0];
      } catch (error) {
        if (retries > 0) {
          console.warn(`Retrying request for ${symbol} in ${delay / 1000} seconds...`);
          await new Promise(res => setTimeout(res, delay));
          return fetchStockData(symbol, retries - 1, delay * 2);
        } else {
          console.error(`Failed to fetch data for ${symbol}:`, error);
          throw error;
        }
      }
    },
    [] // No dependencies needed
  );

  useEffect(() => {
    const cacheKey = `${cacheKeyPrefix}${sectorName}`;
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
      setStocks(JSON.parse(cachedData));
      setLoading(false);
    } else {
      const fetchAllStockData = async () => {
        try {
          const stockDataPromises = stockSymbols.map((symbol) => fetchStockData(symbol));
          const stockDataResponses = await Promise.all(stockDataPromises);
          setStocks(stockDataResponses);
          localStorage.setItem(cacheKey, JSON.stringify(stockDataResponses));
          setError(null);
        } catch (error) {
          setError('Failed to fetch stock data after multiple attempts. Please try again later.');
        } finally {
          setLoading(false);
        }
      };

      fetchAllStockData();
    }
  }, [sectorName, stockSymbols, fetchStockData]);

  return (
    <div className={styles.textBody}>
      <Group>
        <Avatar>
          {icon}
        </Avatar>
        <Title order={3}>{sectorName} Sector</Title>
      </Group>

      <Space h="md" />
      <Text>{description}</Text>
      <Space h="sm" />
      <SectorProsAndCons sectorName={sectorName} pros={pros} cons={cons} />
      <Space h="sm" />
      {loading ? (
        <SkeletonTable />
      ) : error ? (
        <Alert title="Error" color="red">
          {error}
        </Alert>
      ) : (
        <CompanyTable
          sector={sectorName}
          stocks={stocks}
          currentStock={currentStock}
          setCurrentStock={setCurrentStock}
          opened={opened}
          setOpened={setOpened}
        />
      )}
    </div>
  );
};

const SkeletonTable = () => (
  <div>
    {Array.from({ length: 5 }).map((_, index) => (
      <Skeleton key={index} height={50} mb="sm" />
    ))}
  </div>
);

export default SectorCard;
