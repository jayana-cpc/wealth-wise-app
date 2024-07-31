import React, { useState, useEffect } from "react";
import styles from "../EnterpriseValueMultiples/EVtoEBITDA.module.css";
import Image from "next/image";

export function PEGrowth() {
  const [data, setData] = useState({
    peGrowth1: "",
    peGrowth2: "",
    peGrowth3: "",
    stock1: null,
    stock2: null,
    stockSymbol: null,
  });
  const [loading, setLoading] = useState(true);
  const [validity, setValidity] = useState("");
  const [logos, setLogos] = useState({});

  useEffect(() => {
    const storedSymbol = localStorage.getItem("userStock");
    const compStock1 = localStorage.getItem("competitor1");
    const compStock2 = localStorage.getItem("competitor2");

    if (storedSymbol && compStock1 && compStock2) {
      setData((prevData) => ({
        ...prevData,
        stockSymbol: storedSymbol,
        stock1: compStock1,
        stock2: compStock2,
      }));
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchRatios = async (stock) => {
      try {
        const response = await fetch(
          `https://financialmodelingprep.com/api/v3/ratios/${stock}?apikey=${process.env.NEXT_PUBLIC_FIN_MOD_API_KEY}`,
        );
        const data = await response.json();
        return data[0].priceEarningsToGrowthRatio;
      } catch (error) {
        console.error(`Error fetching data for ${stock}:`, error);
        return null;
      }
    };

    const fetchAllRatios = async () => {
      if (data.stock1 && data.stock2 && data.stockSymbol) {
        const cacheKey = `${data.stockSymbol}_${data.stock1}_${data.stock2}_peGrowth`;
        const cachedData = JSON.parse(localStorage.getItem(cacheKey));

        if (cachedData) {
          setData((prevData) => ({
            ...prevData,
            peGrowth1: cachedData.peGrowth1,
            peGrowth2: cachedData.peGrowth2,
            peGrowth3: cachedData.peGrowth3,
          }));
          setLogos(cachedData.logos);
          setLoading(false);
        } else {
          const ratio1 = await fetchRatios(data.stock1);
          const ratio2 = await fetchRatios(data.stock2);
          const ratio3 = await fetchRatios(data.stockSymbol);

          // Fetch company logos
          const logoPromises = [data.stock1, data.stock2, data.stockSymbol].map(
            (symbol) =>
              fetch(
                `https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${process.env.NEXT_PUBLIC_FIN_MOD_API_KEY}`,
              )
                .then((response) => response.json())
                .then((data) => ({ [symbol]: data[0].image })),
          );
          const logoResults = await Promise.all(logoPromises);
          const logos = Object.assign({}, ...logoResults);

          setData((prevData) => ({
            ...prevData,
            peGrowth1: ratio1,
            peGrowth2: ratio2,
            peGrowth3: ratio3,
          }));
          setLogos(logos);

          // Cache the data
          const cacheData = {
            peGrowth1: ratio1,
            peGrowth2: ratio2,
            peGrowth3: ratio3,
            logos,
          };
          localStorage.setItem(cacheKey, JSON.stringify(cacheData));
          setLoading(false);
        }
      }
    };

    fetchAllRatios();
  }, [data.stock1, data.stock2, data.stockSymbol]);

  useEffect(() => {
    if (
      data.stockSymbol &&
      data.peGrowth3 &&
      data.peGrowth1 &&
      data.peGrowth2
    ) {
      callOpenAIAPI2(
        data.stockSymbol,
        data.peGrowth3,
        data.stock1,
        data.stock2,
        data.peGrowth1,
        data.peGrowth2,
      );
    }
  }, [data]);

  const callOpenAIAPI2 = async (
    stockSymbol,
    peGrowth3,
    stock1,
    stock2,
    peGrowth1,
    peGrowth2,
  ) => {
    const APIBody = {
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `Write an analysis on the inputted company's Price Earnings to Growth Ratio which is ${peGrowth3}. Compare its Price Earnings to Growth Ratio to these two companies ${stock1}:${peGrowth1} and ${stock2}:${peGrowth2}. Do not explain what Price Earnings to Growth Ratio is. Response should be 6 sentences`,
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
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + process.env.NEXT_PUBLIC_OPEN_AI_API_KEY,
          },
          body: JSON.stringify(APIBody),
        },
      );

      const data = await response.json();
      setValidity(data.choices[0].message.content);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        Price Earnings over Growth Relative Analysis
      </div>
      <div className={styles.content}>
        <div className={styles.row}>
          <Image
            src={logos[data.stockSymbol]}
            alt={`${data.stockSymbol} logo`}
            width={50}
            height={50}
            className={styles.logo}
          />
          <span>
            {data.stockSymbol} PE/Growth:{" "}
            {parseFloat(data.peGrowth3).toFixed(2)}
          </span>
        </div>
        <div className={styles.row}>
          <Image
            src={logos[data.stock1]}
            alt={`${data.stock1} logo`}
            width={50}
            height={50}
            className={styles.logo}
          />
          <span>
            {data.stock1} PE/Growth: {parseFloat(data.peGrowth1).toFixed(2)}
          </span>
        </div>
        <div className={styles.row}>
          <Image
            src={logos[data.stock2]}
            alt={`${data.stock2} logo`}
            width={50}
            height={50}
            className={styles.logo}
          />
          <span>
            {data.stock2} PE/Growth: {parseFloat(data.peGrowth2).toFixed(2)}
          </span>
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
}
