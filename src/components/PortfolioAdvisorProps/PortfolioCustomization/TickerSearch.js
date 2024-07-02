import React, { useState, useEffect } from 'react';
import styles from './TickerSearch.module.css';
import { SelectedStocksTable } from './SelectedStocksTable';

export function TickerSearch() {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedTicker, setSelectedTicker] = useState(null);

  useEffect(() => {
    if (inputValue.length > 1) {
      const fetchSuggestions = async () => {
        try {
          const response = await fetch(`https://financialmodelingprep.com/api/v3/search-ticker?query=${inputValue}&limit=10&exchange=NASDAQ&apikey=01e4bab5bf0732e8f24a4de466b692bb`);
          if (response.ok) {
            const data = await response.json();
            setSuggestions(data);
          } else {
            console.error('Error fetching data');
          }
        } catch (error) {
          console.error('Error occurred during API request:', error);
        }
      };

      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [inputValue]);

  const handleSelect = async (ticker) => {
    console.log(ticker);

    // Retrieve the user object from our local storage
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      throw new Error("User not found in local storage");
    }

    // Combine ticker and user data into a single object
    const payload = {
      ticker,
      user
    };

    const res = await fetch('http://localhost:5000/api/post-portfolio-info', {
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
    setSelectedTicker(ticker);
    setInputValue('');
    setSuggestions([]);
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