import React from 'react';
import { IconHome } from '@tabler/icons-react';
import SectorCard from './SectorCard';

const RealEstateSector = () => {
  const stockSymbols = ['AMT', 'PLD', 'CCI', 'SPG', 'EQIX', 'DLR'];
  const pros = [
    'Tangible asset investment',
    'Potential for steady income',
    'Appreciation over time',
  ];

  const cons = [
    'Market volatility',
    'High transaction costs',
    'Management and maintenance costs',
  ];

  const description = `
    The Real Estate sector includes companies involved in real estate development and operations.
    This sector benefits from tangible asset investment, potential for steady income, and appreciation over time.
    However, it faces market volatility, high transaction costs, and management and maintenance costs.
  `;

  return (
    <SectorCard
      sectorName="Real Estate"
      description={description}
      pros={pros}
      cons={cons}
      stockSymbols={stockSymbols}
      icon={<IconHome stroke={2} />}
    />
  );
};

export default RealEstateSector;
