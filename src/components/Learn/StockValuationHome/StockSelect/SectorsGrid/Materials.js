import React from "react";
import { IconPackage } from "@tabler/icons-react";
import SectorCard from "./SectorCard";

const MaterialsSector = () => {
  const stockSymbols = ["LIN", "APD", "ECL", "SHW", "NEM", "FCX"];
  const pros = [
    "Essential for various industries",
    "High demand in growth economies",
    "Strong global market presence",
  ];

  const cons = [
    "Exposure to commodity price fluctuations",
    "Environmental and regulatory challenges",
    "High capital investment required",
  ];

  const description = `
    The Materials sector includes companies that produce chemicals, construction materials, glass, paper, and mining. 
    This sector benefits from being essential for various industries, high demand in growth economies, and a strong global market presence.
    However, it is exposed to commodity price fluctuations, faces environmental and regulatory challenges, and requires high capital investment.
  `;

  return (
    <SectorCard
      sectorName="Materials"
      description={description}
      pros={pros}
      cons={cons}
      stockSymbols={stockSymbols}
      icon={<IconPackage stroke={2} />}
    />
  );
};

export default MaterialsSector;
