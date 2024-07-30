import React from 'react';
import { IconBuildingBank } from '@tabler/icons-react';
import SectorCard from './SectorCard';

const FinancialsSector = () => {
  const stockSymbols = ['JPM', 'BAC', 'WFC', 'C', 'GS', 'MS'];
  const pros = [
    'Interest income from loans',
    'Diverse revenue streams',
    'Growth in emerging markets',
  ];

  const cons = [
    'Exposure to economic cycles',
    'Regulatory challenges',
    'Interest rate risks',
  ];

  const description = `
    The Financials sector includes companies involved in banking, investment, insurance, and other financial services. 
    Companies in this sector benefit from interest income from loans, diverse revenue streams, and growth in emerging markets.
    However, they are also exposed to economic cycles, regulatory challenges, and interest rate risks.
  `;

  return (
    <SectorCard
      sectorName="Financials"
      description={description}
      pros={pros}
      cons={cons}
      stockSymbols={stockSymbols}
      icon={<IconBuildingBank stroke={2} />}
    />
  );
};

export default FinancialsSector;
