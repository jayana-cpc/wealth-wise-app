import React, { useState, useEffect } from "react";
import { NewsGrid } from "./NewsGridFind";
import Header from "./Header";
import styles from "../Learn/StockValuationHome/UnderstandingBusiness/NewsDisplay.module.css";

export function NewsDisplay() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stockSymbol, setStockSymbol] = useState(null);
  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    // Retrieve portfolio from local storage
    const storedPortfolio = localStorage.getItem("guestPortfolio");
    if (storedPortfolio) {
      setPortfolio(JSON.parse(storedPortfolio));
    }
  }, []);

  useEffect(() => {
    let url;
    if (stockSymbol) {
      url = `https://api.polygon.io/v2/reference/news?ticker=${stockSymbol}&limit=12&apiKey=${process.env.NEXT_PUBLIC_POLYGON_API_KEY}`;
    } else {
      url = `https://api.polygon.io/v2/reference/news?limit=12&apiKey=${process.env.NEXT_PUBLIC_POLYGON_API_KEY}`;
    }
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setItems(data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [stockSymbol]);

  const handleCompanyChange = (event) => {
    const value = event.target.value;
    setStockSymbol(value === "general" ? null : value);
    setLoading(true);
  };

  return (
    <div className={styles.container}>
      <Header title="News" />
      <div className={styles.navbar}>
        <select onChange={handleCompanyChange} defaultValue="general">
          <option value="general">General News</option>
          {portfolio.map((company) => (
            <option key={company.symbol} value={company.symbol}>
              {company.companyName}
            </option>
          ))}
        </select>
      </div>
      {loading ? <div>Loading...</div> : <NewsGrid items={items} />}
    </div>
  );
}
