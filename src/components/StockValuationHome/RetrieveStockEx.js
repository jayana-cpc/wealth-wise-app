import React, { useState, useEffect } from 'react';

function AnalyzeStockDisplay() {
  const [analyzedStock, setAnalyzedStock] = useState(null);

  useEffect(() => {
    const storedSymbol = localStorage.getItem('userStock');
    if (storedSymbol) {
      setAnalyzedStock(storedSymbol);
    }
  }, []);

  return (
    <div>
      {analyzedStock ? (
        <p>Currently analyzing stock: {analyzedStock}</p>
      ) : (
        <p>No stock is currently being analyzed.</p>
      )}
    </div>
  );
}

export default AnalyzeStockDisplay;


import React, { useState, useEffect } from 'react';
import AnalyzeStockDisplay from '../RetrieveStockEx';
export function StockDescription() {
  const [validity, setValidity] = useState("");
  const [loading, setLoading] = useState(true);
  const [stockSymbol, setStockSymbol] = useState(null);

  useEffect(() => {
    const storedSymbol = localStorage.getItem('userStock');
    console.log("Hello", storedSymbol)
    if (storedSymbol) {
      setStockSymbol(storedSymbol);
    } else {
      setLoading(false); // Ensure loading state is false if no storedSymbol is found
    }
  }, []);

  useEffect(() => {
    if (stockSymbol) {
      console.log("symbol:", stockSymbol);
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
    <div>
      <div>Hello {stockSymbol}</div>
      {loading ? <div>Loading...</div> : <div>{validity}</div>}
      <AnalyzeStockDisplay />
    </div>
  );
}