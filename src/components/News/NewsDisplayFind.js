import React, { useState, useEffect } from "react";
import { NewsGrid } from "./NewsGridFind";
import Header from "./Header";
import styles from "../Learn/StockValuationHome/UnderstandingBusiness/NewsDisplay.module.css";

export function NewsDisplay() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/get-news-data")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.container}>
      <Header title="News" />
      {loading ? <div>Loading...</div> : <NewsGrid items={items} />}
    </div>
  );
}
