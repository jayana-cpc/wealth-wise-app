import React from "react";
import { IconShoppingCart } from "@tabler/icons-react";
import SectorCard from "./SectorCard";

const ConsumerDiscretionarySector = () => {
  const stockSymbols = ["TSLA", "AMZN", "HD", "NKE", "MCD", "SBUX"];
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

  return (
    <SectorCard
      sectorName="Consumer Discretionary"
      description={description}
      pros={pros}
      cons={cons}
      stockSymbols={stockSymbols}
      icon={<IconShoppingCart stroke={2} />}
    />
  );
};

export default ConsumerDiscretionarySector;
