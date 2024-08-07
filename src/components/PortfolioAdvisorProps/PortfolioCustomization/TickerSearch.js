import React, { useState, useEffect } from "react";
import styles from "./TickerSearch.module.css";
import { SelectedStocksTable } from "./SelectedStocksTable";

export function TickerSearch() {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedTicker, setSelectedTicker] = useState(null);

  useEffect(() => {
    if (inputValue.length > 1) {
      const fetchSuggestions = async () => {
        try {
          const response = await fetch(
            `https://financialmodelingprep.com/api/v3/search-ticker?query=${inputValue}&limit=10&apikey=${process.env.NEXT_PUBLIC_FIN_MOD_API_KEY}`,
          );
          if (response.ok) {
            const data = await response.json();
            setSuggestions(data);
          } else {
            console.error("Error fetching data");
          }
        } catch (error) {
          console.error("Error occurred during API request:", error);
        }
      };

      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [inputValue]);

  const handleSelect = async (ticker) => {
    const user = JSON.parse(localStorage.getItem("user"));

    const payload = {
      ticker,
      user,
    };

    try {
      const res = await fetch("https://wealth-wise-flask.vercel.app/api/post-portfolio-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      setSelectedTicker(ticker);
    } catch (error) {
      console.error("Error occurred during API request:", error);
      saveToLocalStorage(ticker);
    } finally {
      setInputValue("");
      setSuggestions([]);
    }
  };

  const saveToLocalStorage = (ticker) => {
    let guestPortfolio =
      JSON.parse(localStorage.getItem("guestPortfolio")) || [];
    guestPortfolio.push(ticker);
    localStorage.setItem("guestPortfolio", JSON.stringify(guestPortfolio));
    setSelectedTicker(ticker);
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        className={styles.input}
        placeholder="Search for a ticker"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      {suggestions.length > 0 && (
        <div className={styles.dropdown}>
          {suggestions.map((ticker) => (
            <div
              key={ticker.symbol}
              className={styles.dropdownItem}
              onClick={() => handleSelect(ticker)}
            >
              {ticker.symbol} - {ticker.name}
            </div>
          ))}
        </div>
      )}
      <SelectedStocksTable selectedTicker={selectedTicker} />
    </div>
  );
}
