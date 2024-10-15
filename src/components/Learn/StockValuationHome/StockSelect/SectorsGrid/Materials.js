import React, { useEffect, useState } from "react";
import { IconPackage } from "@tabler/icons-react";
import SectorCard from "./SectorCard";
import axios from "axios";

const MaterialsSector = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const maxRetries = 3; // Number of retries
  const retryDelay = 2000; // Delay between retries in milliseconds

  const pros = [
    "Essential for various industries",
    "High demand in growth economies",
    "Strong global market presence",
  ];

  const cons = [
    "Exposure to commodity price fluctuations",
    "Environmental and regulatory challenges",
    "High capital investment required",
  ];

  const description = `
    The Materials sector includes companies that produce chemicals, construction materials, glass, paper, and mining. 
    This sector benefits from being essential for various industries, high demand in growth economies, and a strong global market presence.
    However, it is exposed to commodity price fluctuations, faces environmental and regulatory challenges, and requires high capital investment.
  `;

  const fetchData = async (retries = 0) => {
    try {
      const response = await axios.get('https://wealthwize.app/api/sector-data/Materials');
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
      sectorName="Materials"
      description={description}
      pros={pros}
      cons={cons}
      stockSymbols={Object.keys(stocks)} // Passing the stock symbols fetched from the server
      icon={<IconPackage stroke={2} />}
      stocks={stocks} // Passing the full stock data to the SectorCard
    />
  );
};

export default MaterialsSector;
