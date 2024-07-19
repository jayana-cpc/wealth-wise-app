// IndustryIdentify.js
import React, { useState, useEffect } from 'react';

export function IndustryIdentify(){
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
            setValidity(data[0].industry);
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
          {validity !== "" ? (
            <p>{validity} Industry Analysis</p>
          ) : null}
        </div>
  );
};
