import React, { useState, useEffect } from 'react';
import { Card, Skeleton } from '@mantine/core';

export function StockDescription() {
    const [validity, setValidity] = useState("");
    const [loading, setLoading] = useState(true);
    const [stockSymbol, setStockSymbol] = useState(null);
  
    useEffect(() => {
      const storedSymbol = localStorage.getItem('userStock');
      if (storedSymbol) {
        setStockSymbol(storedSymbol);
      } else {
        setLoading(false); 
      }
    }, []);
  
    useEffect(() => {
      if (stockSymbol) {
        async function fetchData() {
          try {
            const response = await fetch(`https://financialmodelingprep.com/api/v3/profile/${stockSymbol}?apikey=${process.env.NEXT_PUBLIC_FIN_MOD_API_KEY}`);
            const data = await response.json();
            setValidity(data[0].description);
          } catch (error) {
            console.error('Error fetching data:', error);
          } finally {
            setLoading(false);
          }
        }
        fetchData();
      }
    }, [stockSymbol]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Card
        bordered={false}
        style={{
          width: 450,
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          border: '1px solid',
          borderRadius: '15px'
        }}
        headStyle={{
          backgroundColor: '#20243c',
          color: '#fff',
          fontSize: '25px',
          fontWeight: '600',
          textAlign: 'center',
        }}
        bodyStyle={{
          padding: '20px',
          display: loading ? 'flex' : 'block',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#181c34',
          color: 'white'
        }}
        loading={loading}
      >
        {loading ? <Skeleton active /> : validity}
      </Card>
    </div>
  );
};

export default StockDescription;