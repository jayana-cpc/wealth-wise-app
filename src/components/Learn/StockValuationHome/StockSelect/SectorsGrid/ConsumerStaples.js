import React from 'react';
import { IconBasket } from '@tabler/icons-react';
import SectorCard from './SectorCard';

const ConsumerStaplesSector = () => {
  const stockSymbols = ['PG', 'KO', 'PEP', 'WMT', 'COST', 'MDLZ'];
  const pros = [
    'Stable demand for essential products',
    'Less cyclical than other sectors',
    'Strong brand loyalty',
  ];

  const cons = [
    'Lower growth potential',
    'High competition',
    'Sensitivity to commodity prices',
  ];

  const description = `
    The Consumer Staples sector includes companies that provide essential products such as food, beverages, and household items.
    This sector benefits from stable demand for essential products, being less cyclical than other sectors, and strong brand loyalty.
    However, it has lower growth potential, faces high competition, and is sensitive to commodity prices.
  `;

  return (
    <SectorCard
      sectorName="Consumer Staples"
      description={description}
      pros={pros}
      cons={cons}
      stockSymbols={stockSymbols}
      icon={<IconBasket stroke={2} />}
    />
  );
};

export default ConsumerStaplesSector;
