import React from 'react';
import { IconHeartbeat } from '@tabler/icons-react';
import SectorCard from './SectorCard';

const HealthcareSector = () => {
  const stockSymbols = ['JNJ', 'PFE', 'UNH', 'MRK', 'ABBV', 'TMO'];
  const pros = [
    'Growing and aging population',
    'Constant demand for healthcare services',
    'Advancements in medical technology',
  ];

  const cons = [
    'High regulatory scrutiny',
    'Rising costs of healthcare',
    'Uncertain reimbursement policies',
  ];

  const description = `
    The Healthcare sector includes companies that provide medical services, manufacture medical equipment or drugs, provide medical insurance, or otherwise facilitate the provision of healthcare to patients.
    The sector benefits from a growing and aging population, constant demand for healthcare services, and advancements in medical technology.
    However, companies in this sector also face high regulatory scrutiny, rising costs of healthcare, and uncertain reimbursement policies.
  `;

  return (
    <SectorCard
      sectorName="Healthcare"
      description={description}
      pros={pros}
      cons={cons}
      stockSymbols={stockSymbols}
      icon={<IconHeartbeat stroke={2} />}
    />
  );
};

export default HealthcareSector;
