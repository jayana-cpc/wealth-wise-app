import React from "react";
import { IconAntenna } from "@tabler/icons-react";
import SectorCard from "./SectorCard";

const CommunicationServicesSector = () => {
  const stockSymbols = ["GOOGL", "META", "NFLX", "DIS", "VZ", "T"];
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

  return (
    <SectorCard
      sectorName="Communication Services"
      description={description}
      pros={pros}
      cons={cons}
      stockSymbols={stockSymbols}
      icon={<IconAntenna stroke={2} />}
    />
  );
};

export default CommunicationServicesSector;
