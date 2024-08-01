import React, { useState, useEffect } from "react";

export function StockDescription() {
  const [validity, setValidity] = useState("");
  const [stockSymbol, setStockSymbol] = useState(null);

  useEffect(() => {
    const storedSymbol = localStorage.getItem("userStock");
    if (storedSymbol) {
      setStockSymbol(storedSymbol);
    }
  }, []);

  useEffect(() => {
    if (stockSymbol) {
      async function fetchData() {
        try {
          const response = await fetch(
            `https://financialmodelingprep.com/api/v3/profile/${stockSymbol}?apikey=${process.env.NEXT_PUBLIC_FIN_MOD_API_KEY}`,
          );
          const data = await response.json();
          setValidity(data[0].description);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
      fetchData();
    }
  }, [stockSymbol]);

  return <div>{validity}</div>;
}

export default StockDescription;
