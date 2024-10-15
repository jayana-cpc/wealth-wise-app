import React, { useEffect, useState } from "react";
import { IconDeviceLaptop } from "@tabler/icons-react";
import SectorCard from "./SectorCard";
import axios from "axios";

const TechnologySector = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const maxRetries = 3; // Number of retries
  const retryDelay = 2000; // Delay between retries in milliseconds

  const pros = [
    "Rapid innovation and growth",
    "High profit margins",
    "Strong consumer demand",
  ];

  const cons = [
    "High competition",
    "Regulatory challenges",
    "Technological obsolescence",
  ];

  const description = `
    The Technology sector includes companies involved in the development, manufacturing, and distribution of technology-based goods and services.
    This sector is known for its rapid innovation and high growth potential. Companies in this sector benefit from strong consumer demand and high profit margins.
    However, they also face high competition, regulatory challenges, and the risk of technological obsolescence.
  `;

  const fetchData = async (retries = 0) => {
    const sector = encodeURIComponent("Technology");
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
      sectorName="Technology"
      description={description}
      pros={pros}
      cons={cons}
      stockSymbols={Object.keys(stocks)}
      icon={<IconDeviceLaptop stroke={2} />}
      stocks={stocks}
    />
  );
};

export default TechnologySector;
