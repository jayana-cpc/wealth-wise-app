import React, { useEffect, useState } from "react";
import { IconHeartbeat } from "@tabler/icons-react";
import SectorCard from "./SectorCard";
import axios from "axios";
const URL = process.env.NEXT_PUBLIC_BACKEND_URL 

const HealthcareSector = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const maxRetries = 3; // Number of retries
  const retryDelay = 2000; // Delay between retries in milliseconds

  const pros = [
    "Growing and aging population",
    "Constant demand for healthcare services",
    "Advancements in medical technology",
  ];

  const cons = [
    "High regulatory scrutiny",
    "Rising costs of healthcare",
    "Uncertain reimbursement policies",
  ];

  const description = `
    The Healthcare sector includes companies that provide medical services, manufacture medical equipment or drugs, provide medical insurance, or otherwise facilitate the provision of healthcare to patients.
    The sector benefits from a growing and aging population, constant demand for healthcare services, and advancements in medical technology.
    However, companies in this sector also face high regulatory scrutiny, rising costs of healthcare, and uncertain reimbursement policies.
  `;

  const fetchData = async (retries = 0) => {
    const sector = encodeURIComponent("Healthcare");
    try {
      const response = await axios.get(`${URL}/api/sector-data/${sector}`);
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
      sectorName="Healthcare"
      description={description}
      pros={pros}
      cons={cons}
      stockSymbols={Object.keys(stocks)}
      icon={<IconHeartbeat stroke={2} />}
      stocks={stocks}
    />
  );
};

export default HealthcareSector;
