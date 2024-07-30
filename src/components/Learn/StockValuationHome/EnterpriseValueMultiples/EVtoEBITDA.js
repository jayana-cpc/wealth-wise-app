import React, { useState, useEffect } from 'react';
import styles from './EVtoEBITDA.module.css';
import Image from 'next/image';

const EVtoEBITDA = () => {
  const [loading, setLoading] = useState(true);
  const [enterpriseValueMultiple1, setEnterpriseValueMultiple1] = useState("");
  const [enterpriseValueMultiple2, setEnterpriseValueMultiple2] = useState("");
  const [enterpriseValueMultiple3, setEnterpriseValueMultiple3] = useState("");
  const [validity, setValidity] = useState("");
  const [stock1, setStock1] = useState(null);
  const [stock2, setStock2] = useState(null);
  const [stockSymbol, setStockSymbol] = useState(null);
  const [logos, setLogos] = useState({});

  useEffect(() => {
    const storedSymbol = localStorage.getItem('userStock');
    const compStock1 = localStorage.getItem('competitor1');
    const compStock2 = localStorage.getItem('competitor2');
    if (storedSymbol && compStock1 && compStock2) {
      setStockSymbol(storedSymbol);
      setStock1(compStock1);
      setStock2(compStock2);
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (stock1 && stock2 && stockSymbol) {
        const cacheKey = `${stockSymbol}_${stock1}_${stock2}`;
        const cachedData = JSON.parse(localStorage.getItem(cacheKey));

        if (cachedData) {
          setEnterpriseValueMultiple1(cachedData.enterpriseValueMultiple1);
          setEnterpriseValueMultiple2(cachedData.enterpriseValueMultiple2);
          setEnterpriseValueMultiple3(cachedData.enterpriseValueMultiple3);
          setLogos(cachedData.logos);
          setLoading(false);
        } else {
          try {
            const response1 = await fetch(`https://financialmodelingprep.com/api/v3/key-metrics-ttm/${stock1}?limit=40&apikey=${process.env.NEXT_PUBLIC_FIN_MOD_API_KEY}`);
            const data1 = await response1.json();
            setEnterpriseValueMultiple1(data1[0].enterpriseValueOverEBITDATTM);

            const response2 = await fetch(`https://financialmodelingprep.com/api/v3/key-metrics-ttm/${stock2}?limit=40&apikey=${process.env.NEXT_PUBLIC_FIN_MOD_API_KEY}`);
            const data2 = await response2.json();
            setEnterpriseValueMultiple2(data2[0].enterpriseValueOverEBITDATTM);

            const response3 = await fetch(`https://financialmodelingprep.com/api/v3/key-metrics-ttm/${stockSymbol}?limit=40&apikey=${process.env.NEXT_PUBLIC_FIN_MOD_API_KEY}`);
            const data3 = await response3.json();
            setEnterpriseValueMultiple3(data3[0].enterpriseValueOverEBITDATTM);

            // Fetch company logos
            const logoPromises = [stock1, stock2, stockSymbol].map(symbol =>
              fetch(`https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${process.env.NEXT_PUBLIC_FIN_MOD_API_KEY}`)
                .then(response => response.json())
                .then(data => ({ [symbol]: data[0].image }))
            );
            const logoResults = await Promise.all(logoPromises);
            const logos = Object.assign({}, ...logoResults);
            setLogos(logos);

            // Cache the data
            const cacheData = {
              enterpriseValueMultiple1: data1[0].enterpriseValueOverEBITDATTM,
              enterpriseValueMultiple2: data2[0].enterpriseValueOverEBITDATTM,
              enterpriseValueMultiple3: data3[0].enterpriseValueOverEBITDATTM,
              logos,
            };
            localStorage.setItem(cacheKey, JSON.stringify(cacheData));
            setLoading(false);
          } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
          }
        }
      }
    };

    fetchData();
  }, [stock1, stock2, stockSymbol]);

  useEffect(() => {
    if (stockSymbol && enterpriseValueMultiple1 && enterpriseValueMultiple2 && enterpriseValueMultiple3) {
      callOpenAIAPI2(stockSymbol, enterpriseValueMultiple3, stock1, stock2, enterpriseValueMultiple1, enterpriseValueMultiple2);
    }
  }, [stockSymbol, stock1, stock2, enterpriseValueMultiple1, enterpriseValueMultiple2, enterpriseValueMultiple3]);

  const callOpenAIAPI2 = async (stockSymbol, enterpriseValueMultiple3, stock1, stock2, enterpriseValueMultiple1, enterpriseValueMultiple2) => {
    const APIBody = {
      "model": "gpt-4o-mini",
      "messages": [
        {
          "role": "system",
          "content": `Write an analysis on the inputted company's EV/EBITDA which is ${enterpriseValueMultiple3}. Compare its EV/EBITDA to these two companies ${stock1}:${enterpriseValueMultiple1} and ${stock2}:${enterpriseValueMultiple2}. Do not explain what EV/EBITDA is. Response should be 6 sentences`,
        },
        {
          "role": "user",
          "content": stockSymbol,
        },
      ],
      "temperature": 1,
      "max_tokens": 200,
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
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>Enterprise Value over EBITDA Relative Analysis</div>
      <div className={styles.content}>
        <div className={styles.row}>
          <Image src={logos[stockSymbol]} alt={`${stockSymbol} logo`} width={50} height={50} className={styles.logo} />
          <span>{stockSymbol} EV/EBITDA: {parseFloat(enterpriseValueMultiple3).toFixed(2)}</span>
        </div>
        <div className={styles.row}>
          <Image src={logos[stock1]} alt={`${stock1} logo`} width={50} height={50} className={styles.logo} />
          <span>{stock1} EV/EBITDA: {parseFloat(enterpriseValueMultiple1).toFixed(2)}</span>
        </div>
        <div className={styles.row}>
          <Image src={logos[stock2]} alt={`${stock2} logo`} width={50} height={50} className={styles.logo} />
          <span>{stock2} EV/EBITDA: {parseFloat(enterpriseValueMultiple2).toFixed(2)}</span>
        </div>
        {loading ? (
          <div className={styles.loading}>loading...</div>
        ) : (
          <div className={styles.validity}>{validity}</div>
        )}
      </div>
    </div>
  );
};

export default EVtoEBITDA;
