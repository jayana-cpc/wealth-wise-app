import React, { useEffect, useState } from "react";
import { IconAntenna } from "@tabler/icons-react";
import SectorCard from "./SectorCard";
import axios from "axios";
const URL = process.env.NEXT_PUBLIC_BACKEND_URL 

const CommunicationServicesSector = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const maxRetries = 3; // Number of retries
  const retryDelay = 2000; // Delay between retries in milliseconds

  const pros = [
    "High demand for communication services",
    "Innovation and technological advancements",
    "Strong consumer base",
  ];

  const cons = [
    "Regulatory challenges",
    "High competition",
    "Rapidly changing technology landscape",
  ];

  const description = `
    The Communication Services sector includes companies that provide communication services through fixed-line, wireless, and other means.
    This sector benefits from high demand for communication services, innovation and technological advancements, and a strong consumer base.
    However, it faces regulatory challenges, high competition, and a rapidly changing technology landscape.
  `;

  const fetchData = async (retries = 0) => {
    const sector = encodeURIComponent("Communication Services");
    try {
      const response = await axios.get(`https://www.${URL}/api/sector-data/${sector}`);
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
      sectorName="Communication Services"
      description={description}
      pros={pros}
      cons={cons}
      stockSymbols={Object.keys(stocks)}
      icon={<IconAntenna stroke={2} />}
      stocks={stocks}
    />
  );
};

export default CommunicationServicesSector;
