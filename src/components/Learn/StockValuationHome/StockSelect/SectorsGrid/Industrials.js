import React from "react";
import { IconBuildingSkyscraper } from "@tabler/icons-react";
import SectorCard from "./SectorCard";

const IndustrialsSector = () => {
  const stockSymbols = ["BA", "CAT", "GE", "UNP", "MMM", "UPS"];
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

  return (
    <SectorCard
      sectorName="Industrials"
      description={description}
      pros={pros}
      cons={cons}
      stockSymbols={stockSymbols}
      icon={<IconBuildingSkyscraper stroke={2} />}
    />
  );
};

export default IndustrialsSector;
