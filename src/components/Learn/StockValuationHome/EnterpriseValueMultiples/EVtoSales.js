import React, { useState, useEffect } from 'react';
import styles from './EVtoEBITDA.module.css';
import Image from 'next/image';

const EVtoSales = () => {
  const [data, setData] = useState({
    enterpriseValueSales1: "",
    enterpriseValueSales2: "",
    enterpriseValueSales3: "",
    stock1: null,
    stock2: null,
    stockSymbol: null
  });
  const [loading, setLoading] = useState(true);
  const [validity, setValidity] = useState("");
  const [logos, setLogos] = useState({});

  useEffect(() => {
    const storedSymbol = localStorage.getItem('userStock');
    const compStock1 = localStorage.getItem('competitor1');
    const compStock2 = localStorage.getItem('competitor2');

    if (storedSymbol && compStock1 && compStock2) {
      setData(prevData => ({
        ...prevData,
        stockSymbol: storedSymbol,
        stock1: compStock1,
        stock2: compStock2
      }));
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchRatios = async (stock) => {
      try {
        const response = await fetch(`https://financialmodelingprep.com/api/v3/key-metrics-ttm/${stock}?apikey=${process.env.NEXT_PUBLIC_FIN_MOD_API_KEY}`);
        const data = await response.json();
        return data[0].evToSalesTTM;
      } catch (error) {
        console.error(`Error fetching data for ${stock}:`, error);
        return null;
      }
    };

    const fetchAllRatios = async () => {
      if (data.stock1 && data.stock2 && data.stockSymbol) {
        const cacheKey = `${data.stockSymbol}_${data.stock1}_${data.stock2}_evToSales`;
        const cachedData = JSON.parse(localStorage.getItem(cacheKey));

        if (cachedData) {
          setData(prevData => ({
            ...prevData,
            enterpriseValueSales1: cachedData.enterpriseValueSales1,
            enterpriseValueSales2: cachedData.enterpriseValueSales2,
            enterpriseValueSales3: cachedData.enterpriseValueSales3
          }));
          setLogos(cachedData.logos);
          setLoading(false);
        } else {
          const ratio1 = await fetchRatios(data.stock1);
          const ratio2 = await fetchRatios(data.stock2);
          const ratio3 = await fetchRatios(data.stockSymbol);

          // Fetch company logos
          const logoPromises = [data.stock1, data.stock2, data.stockSymbol].map(symbol =>
            fetch(`https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${process.env.NEXT_PUBLIC_FIN_MOD_API_KEY}`)
              .then(response => response.json())
              .then(data => ({ [symbol]: data[0].image }))
          );
          const logoResults = await Promise.all(logoPromises);
          const logos = Object.assign({}, ...logoResults);

          setData(prevData => ({
            ...prevData,
            enterpriseValueSales1: ratio1,
            enterpriseValueSales2: ratio2,
            enterpriseValueSales3: ratio3
          }));
          setLogos(logos);

          // Cache the data
          const cacheData = {
            enterpriseValueSales1: ratio1,
            enterpriseValueSales2: ratio2,
            enterpriseValueSales3: ratio3,
            logos
          };
          localStorage.setItem(cacheKey, JSON.stringify(cacheData));
          setLoading(false);
        }
      }
    };

    fetchAllRatios();
  }, [data.stock1, data.stock2, data.stockSymbol]);

  useEffect(() => {
    if (data.stockSymbol && data.enterpriseValueSales3 && data.enterpriseValueSales1 && data.enterpriseValueSales2) {
      callOpenAIAPI2(data.stockSymbol, data.enterpriseValueSales3, data.stock1, data.stock2, data.enterpriseValueSales1, data.enterpriseValueSales2);
    }
  }, [data]);

  const callOpenAIAPI2 = async (stockSymbol, enterpriseValueSales3, stock1, stock2, enterpriseValueSales1, enterpriseValueSales2) => {
    const APIBody = {
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `Write an analysis on the inputed company's EV/Sales which is ${enterpriseValueSales3}. Compare its EV/Sales to these two companies ${stock1}:${enterpriseValueSales1} and ${stock2}:${enterpriseValueSales2}. Do not explain what EV/Sales is. Response should be 6 sentences.`,
        },
        {
          role: "user",
          content: stockSymbol,
        },
      ],
      temperature: 1,
      max_tokens: 300,
    };

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + process.env.NEXT_PUBLIC_OPEN_AI_API_KEY,
        },
        body: JSON.stringify(APIBody),
      });

      const data = await response.json();
      setValidity(data.choices[0].message.content);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>Enterprise Value over Sales Relative Analysis</div>
      <div className={styles.content}>
        <div className={styles.row}>
          <Image src={logos[data.stockSymbol]} alt={`${data.stockSymbol} logo`} width={50} height={50} className={styles.logo} />
          <span>{data.stockSymbol} EV/Sales: {parseFloat(data.enterpriseValueSales3).toFixed(2)}</span>
        </div>
        <div className={styles.row}>
          <Image src={logos[data.stock1]} alt={`${data.stock1} logo`} width={50} height={50} className={styles.logo} />
          <span>{data.stock1} EV/Sales: {parseFloat(data.enterpriseValueSales1).toFixed(2)}</span>
        </div>
        <div className={styles.row}>
          <Image src={logos[data.stock2]} alt={`${data.stock2} logo`} width={50} height={50} className={styles.logo} />
          <span>{data.stock2} EV/Sales: {parseFloat(data.enterpriseValueSales2).toFixed(2)}</span>
        </div>
        <div>
          {loading ? (
            <div className={styles.loading}>Loading...</div>
          ) : (
            <div className={styles.validity}>{validity}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EVtoSales;
