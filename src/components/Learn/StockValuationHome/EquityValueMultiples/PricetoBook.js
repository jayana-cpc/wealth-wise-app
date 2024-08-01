import React, { useState, useEffect } from "react";
import styles from "../EnterpriseValueMultiples/EVtoEBITDA.module.css";
import Image from "next/image";

const apiKey = process.env.NEXT_PUBLIC_OPEN_AI_API_KEY;

export function PricetoBook() {
  const [data, setData] = useState({
    priceBook1: "",
    priceBook2: "",
    priceBook3: "",
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
          `https://financialmodelingprep.com/api/v3/ratios-ttm/${stock}?apikey=${process.env.NEXT_PUBLIC_FIN_MOD_API_KEY}`,
        );
        const data = await response.json();
        return data[0].priceToBookRatioTTM;
      } catch (error) {
        console.error(`Error fetching data for ${stock}:`, error);
        return null;
      }
    };

    const fetchAllRatios = async () => {
      if (data.stock1 && data.stock2 && data.stockSymbol) {
        const cacheKey = `${data.stockSymbol}_${data.stock1}_${data.stock2}_priceToBook`;
        const cachedData = JSON.parse(localStorage.getItem(cacheKey));

        if (cachedData) {
          setData((prevData) => ({
            ...prevData,
            priceBook1: cachedData.priceBook1,
            priceBook2: cachedData.priceBook2,
            priceBook3: cachedData.priceBook3,
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
            priceBook1: ratio1,
            priceBook2: ratio2,
            priceBook3: ratio3,
          }));
          setLogos(logos);

          // Cache the data
          const cacheData = {
            priceBook1: ratio1,
            priceBook2: ratio2,
            priceBook3: ratio3,
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
      data.priceBook3 &&
      data.priceBook1 &&
      data.priceBook2
    ) {
      callOpenAIAPI2(
        data.stockSymbol,
        data.priceBook3,
        data.stock1,
        data.stock2,
        data.priceBook1,
        data.priceBook2,
      );
    }
  }, [data]);

  const callOpenAIAPI2 = async (
    stockSymbol,
    priceBook3,
    stock1,
    stock2,
    priceBook1,
    priceBook2,
  ) => {
    const APIBody = {
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `Write an analysis on the inputted company's Price to Book Ratio which is ${priceBook3}. Compare its Price to Book Ratio to these two companies ${stock1}:${priceBook1} and ${stock2}:${priceBook2}. Do not explain what Price to Book Ratio is. Response should be 6 sentences`,
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
            Authorization: "Bearer " + apiKey,
          },
          body: JSON.stringify(APIBody),
        },
      );

      const result = await response.json();
      setValidity(result.choices[0].message.content);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>Price to Book Relative Analysis</div>
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
            {data.stockSymbol} Price/Book:{" "}
            {parseFloat(data.priceBook3).toFixed(2)}
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
            {data.stock1} Price/Book: {parseFloat(data.priceBook1).toFixed(2)}
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
            {data.stock2} Price/Book: {parseFloat(data.priceBook2).toFixed(2)}
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

export default PricetoBook;
