import React, { useEffect, useState } from "react";
import { IconBuildingBank } from "@tabler/icons-react";
import SectorCard from "./SectorCard";
import axios from "axios";
const URL = process.env.NEXT_PUBLIC_BACKEND_URL 

const FinancialsSector = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const maxRetries = 3; // Number of retries
  const retryDelay = 2000; // Delay between retries in milliseconds

  const pros = [
    "Interest income from loans",
    "Diverse revenue streams",
    "Growth in emerging markets",
  ];

  const cons = [
    "Exposure to economic cycles",
    "Regulatory challenges",
    "Interest rate risks",
  ];

  const description = `
    The Financials sector includes companies involved in banking, investment, insurance, and other financial services. 
    Companies in this sector benefit from interest income from loans, diverse revenue streams, and growth in emerging markets.
    However, they are also exposed to economic cycles, regulatory challenges, and interest rate risks.
  `;

  const fetchData = async (retries = 0) => {
    const sector = encodeURIComponent("Financials");
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
      sectorName="Financials"
      description={description}
      pros={pros}
      cons={cons}
      stockSymbols={Object.keys(stocks)}
      icon={<IconBuildingBank stroke={2} />}
      stocks={stocks}
    />
  );
};

export default FinancialsSector;
