import React from "react";
import { IconPlug } from "@tabler/icons-react";
import SectorCard from "./SectorCard";

const UtilitiesSector = () => {
  const stockSymbols = ["NEE", "DUK", "SO", "D", "AEP", "EXC"];
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

  return (
    <SectorCard
      sectorName="Utilities"
      description={description}
      pros={pros}
      cons={cons}
      stockSymbols={stockSymbols}
      icon={<IconPlug stroke={2} />}
    />
  );
};

export default UtilitiesSector;
