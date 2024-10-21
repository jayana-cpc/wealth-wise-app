import React, { useEffect, useState } from "react";
import { IconPlug } from "@tabler/icons-react";
import SectorCard from "./SectorCard";
import axios from "axios";

const UtilitiesSector = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const maxRetries = 3; // Number of retries
  const retryDelay = 2000; // Delay between retries in milliseconds

  const pros = [
    "Stable and consistent demand",
    "Regulated market",
    "High dividend yields",
  ];

  const cons = [
    "Regulatory risks",
    "Capital intensive",
    "Limited growth potential",
  ];

  const description = `
    The Utilities sector includes companies that provide essential services such as electricity, gas, and water. 
    This sector benefits from stable and consistent demand, a regulated market, and high dividend yields.
    However, it faces regulatory risks, is capital intensive, and has limited growth potential.
  `;

  const fetchData = async (retries = 0) => {
    const sector = encodeURIComponent("Utilities");
    try {
      const response = await axios.get(`http://${URL}/api/sector-data/${sector}`);
      console.log("API response:", response.data); // Log the full response
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
      sectorName="Utilities"
      description={description}
      pros={pros}
      cons={cons}
      stockSymbols={Object.keys(stocks)}
      icon={<IconPlug stroke={2} />}
      stocks={stocks}
    />
  );
};

export default UtilitiesSector;
