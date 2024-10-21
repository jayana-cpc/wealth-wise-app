import React, { useEffect, useState } from "react";
import { IconBuildingSkyscraper } from "@tabler/icons-react";
import SectorCard from "./SectorCard";
import axios from "axios";
const URL = process.env.NEXT_PUBLIC_BACKEND_URL 

const IndustrialsSector = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const maxRetries = 3; // Number of retries
  const retryDelay = 2000; // Delay between retries in milliseconds

  const pros = [
    "Diverse range of industries",
    "Beneficial in economic expansions",
    "Innovation and technological advancements",
  ];

  const cons = [
    "Sensitivity to economic downturns",
    "High capital expenditure",
    "Global competition",
  ];

  const description = `
    The Industrials sector includes companies involved in manufacturing, construction, and transportation. 
    This sector benefits from a diverse range of industries, being beneficial in economic expansions, and innovation and technological advancements.
    However, it is sensitive to economic downturns, requires high capital expenditure, and faces global competition.
  `;

  const fetchData = async (retries = 0) => {
    try {
      const response = await axios.get(`http://${URL}/api/sector-data/Industrials`);
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
      sectorName="Industrials"
      description={description}
      pros={pros}
      cons={cons}
      stockSymbols={Object.keys(stocks)} // Passing the stock symbols fetched from the server
      icon={<IconBuildingSkyscraper stroke={2} />}
      stocks={stocks} // Passing the full stock data to the SectorCard
    />
  );
};

export default IndustrialsSector;
