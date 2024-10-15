import React, { useEffect, useState } from "react";
import { IconShoppingCart } from "@tabler/icons-react";
import SectorCard from "./SectorCard";
import axios from "axios";

const ConsumerDiscretionarySector = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const maxRetries = 3; // Number of retries
  const retryDelay = 2000; // Delay between retries in milliseconds

  const pros = [
    "Consumer spending drives growth",
    "Diverse range of industries",
    "Innovative and dynamic sector",
  ];

  const cons = [
    "Sensitivity to economic downturns",
    "High competition",
    "Changing consumer preferences",
  ];

  const description = `
    The Consumer Discretionary sector includes companies that provide non-essential goods and services, such as automobiles, entertainment, and restaurants. 
    This sector benefits from consumer spending driving growth, a diverse range of industries, and being innovative and dynamic.
    However, it is sensitive to economic downturns, faces high competition, and must adapt to changing consumer preferences.
  `;

  const fetchData = async (retries = 0) => {
    const sector = encodeURIComponent("Consumer Discretionary");
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
      sectorName="Consumer Discretionary"
      description={description}
      pros={pros}
      cons={cons}
      stockSymbols={Object.keys(stocks)}
      icon={<IconShoppingCart stroke={2} />}
      stocks={stocks}
    />
  );
};

export default ConsumerDiscretionarySector;
