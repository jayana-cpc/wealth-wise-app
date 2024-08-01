import React from "react";
import { IconDeviceLaptop } from "@tabler/icons-react";
import SectorCard from "./SectorCard";

const TechnologySector = () => {
  const stockSymbols = ["AAPL", "MSFT", "GOOGL", "AMZN", "META", "INTC"];
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

  return (
    <SectorCard
      sectorName="Technology"
      description={description}
      pros={pros}
      cons={cons}
      stockSymbols={stockSymbols}
      icon={<IconDeviceLaptop stroke={2} />}
    />
  );
};

export default TechnologySector;
