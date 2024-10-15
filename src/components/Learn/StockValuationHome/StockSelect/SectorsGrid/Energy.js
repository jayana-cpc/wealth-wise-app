import React, { useEffect, useState } from "react";
import { IconBolt } from "@tabler/icons-react";
import SectorCard from "./SectorCard";
import axios from "axios";

const EnergySector = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const maxRetries = 3; // Number of retries
  const retryDelay = 2000; // Delay between retries in milliseconds

  const pros = [
    "High demand for energy worldwide",
    "Potential for high returns",
    "Innovations in renewable energy",
  ];

  const cons = [
    "High capital requirements",
    "Regulatory and environmental risks",
    "Commodity price volatility",
  ];

  const description = `
    The Energy sector includes companies involved in the exploration, production, refining, marketing, and storage of oil, gas, and coal.
    It also encompasses companies that provide drilling and other energy-related services.
    Companies in this sector are exposed to cyclical fluctuations in demand, commodity price volatility, regulatory changes, and environmental issues.
    Global economic conditions and industrial activity significantly influence this sector.
  `;

  const fetchData = async (retries = 0) => {
    const sector = encodeURIComponent("Energy");
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
      sectorName="Energy"
      description={description}
      pros={pros}
      cons={cons}
      stockSymbols={Object.keys(stocks)} // Passing the stock symbols fetched from the server
      icon={<IconBolt stroke={2} />}
      stocks={stocks} // Passing the full stock data to the SectorCard
    />
  );
};

export default EnergySector;
