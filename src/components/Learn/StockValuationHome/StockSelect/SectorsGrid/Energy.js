import React from "react";
import { IconBolt } from "@tabler/icons-react";
import SectorCard from "./SectorCard";

const EnergySector = () => {
  const stockSymbols = ["XOM", "CVX", "NEE", "FSLR", "DUK", "SO"];
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

  return (
    <SectorCard
      sectorName="Energy"
      description={description}
      pros={pros}
      cons={cons}
      stockSymbols={stockSymbols}
      icon={<IconBolt stroke={2} />}
    />
  );
};

export default EnergySector;
