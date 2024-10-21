import React, { useEffect, useState } from "react";
import { IconBasket } from "@tabler/icons-react";
import SectorCard from "./SectorCard";
import axios from "axios";
const URL = process.env.NEXT_PUBLIC_BACKEND_URL 

const ConsumerStaplesSector = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const maxRetries = 3; // Number of retries
  const retryDelay = 2000; // Delay between retries in milliseconds

  const pros = [
    "Stable demand for essential products",
    "Less cyclical than other sectors",
    "Strong brand loyalty",
  ];

  const cons = [
    "Lower growth potential",
    "High competition",
    "Sensitivity to commodity prices",
  ];

  const description = `
    The Consumer Staples sector includes companies that provide essential products such as food, beverages, and household items.
    This sector benefits from stable demand for essential products, being less cyclical than other sectors, and strong brand loyalty.
    However, it has lower growth potential, faces high competition, and is sensitive to commodity prices.
  `;

  const fetchData = async (retries = 0) => {
    const sector = encodeURIComponent("Consumer Staples");
    try {
      const response = await axios.get(`http://${URL}/api/sector-data/${sector}`);
      setStocks(response.data.data || []); // Safeguard to ensure stocks is always an array
      setLoading(false);
    } catch (error) {
      if (retries < maxRetries) {
        console.warn(`Retrying fetch... (${retries + 1}/${maxRetries})`);
        setTimeout(() => fetchData(retries + 1), retryDelay); // Retry after delay
      } else {
        console.error("API call failed after retries:", error);
        setError("Failed to fetch stock data");
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchData(); // Initial fetch
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <SectorCard
      sectorName="Consumer Staples"
      description={description}
      pros={pros}
      cons={cons}
      stockSymbols={Object.keys(stocks)}
      icon={<IconBasket stroke={2} />}
      stocks={stocks}
    />
  );
};

export default ConsumerStaplesSector;
