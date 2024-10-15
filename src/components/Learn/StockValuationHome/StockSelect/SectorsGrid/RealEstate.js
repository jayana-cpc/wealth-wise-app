import React, { useEffect, useState } from "react";
import { IconHome } from "@tabler/icons-react";
import SectorCard from "./SectorCard";
import axios from "axios";

const RealEstateSector = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const maxRetries = 3; // Number of retries
  const retryDelay = 2000; // Delay between retries in milliseconds

  const pros = [
    "Tangible asset investment",
    "Potential for steady income",
    "Appreciation over time",
  ];

  const cons = [
    "Market volatility",
    "High transaction costs",
    "Management and maintenance costs",
  ];

  const description = `
    The Real Estate sector includes companies involved in real estate development and operations.
    This sector benefits from tangible asset investment, potential for steady income, and appreciation over time.
    However, it faces market volatility, high transaction costs, and management and maintenance costs.
  `;

  const fetchData = async (retries = 0) => {
    const sector = encodeURIComponent("Real Estate");
    try {
      const response = await axios.get(`https://wealthwize.app/api/sector-data/${sector}`);
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
      sectorName="Real Estate"
      description={description}
      pros={pros}
      cons={cons}
      stockSymbols={Object.keys(stocks)} // Passing the stock symbols fetched from the server
      icon={<IconHome stroke={2} />}
      stocks={stocks} // Passing the full stock data to the SectorCard
    />
  );
};

export default RealEstateSector;
