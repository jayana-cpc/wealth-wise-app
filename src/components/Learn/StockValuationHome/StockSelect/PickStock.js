import React from 'react';
import {
  Title,
  Center,
  Text,
  Container,
  Paper,
  Space,
} from '@mantine/core';
import styles from './PickStock.module.css';
import '@mantine/carousel/styles.css';
import { StockSurveyCard } from '@/components/Dashboard/StockSurveyCard';
import { TickerSearch } from './TickerSearchLearn';
import EnergySector from './SectorsGrid/Energy';
import CommunicationServicesSector from './SectorsGrid/CommunicationServices';
import ConsumerDiscretionarySector from './SectorsGrid/ConsumerDiscretionary';
import ConsumerStaplesSector from './SectorsGrid/ConsumerStaples';
import FinancialsSector from './SectorsGrid/Financials';
import HealthcareSector from './SectorsGrid/Healthcare';
import IndustrialsSector from './SectorsGrid/Industrials';
import MaterialsSector from './SectorsGrid/Materials';
import RealEstateSector from './SectorsGrid/RealEstate';
import TechnologySector from './SectorsGrid/Technology';
import UtilitiesSector from './SectorsGrid/Utilities';

export function PickStock() {
  return (
    <Container>
      <Paper shadow="sm" p="md">
        <Space h="lg" />
        <Title order={1} c="white" id="stock-selection">Stock Selection</Title>
        <Space h="md" />
        <Text>Lets begin the stock valuation journey with selecting the company we want to value! </Text>
        <Space h="md" />
        <Space h="md" />
        <Title order={2} c="white" id="11-gics-sectors">The 11 GICS Sectors</Title>
        <Space h="md" />
        <Text c="white">Understanding the 11 GICS sectors is essential for choosing which companies you want to invest in.</Text>
        <Space h="md" />
        <div id="energy-sector">
          <EnergySector />
        </div>
        <Space h="md" />
        <Space h="md" />
        <div id="communication-services-sector">
          <CommunicationServicesSector />
        </div>
        <Space h="md" />
        <Space h="md" />
        <div id="consumer-discretionary-sector">
          <ConsumerDiscretionarySector />
        </div>
        <Space h="md" />
        <Space h="md" />
        <div id="consumer-staples-sector">
          <ConsumerStaplesSector />
        </div>
        <Space h="md" />
        <Space h="md" />
        <div id="financials-sector">
          <FinancialsSector />
        </div>
        <Space h="md" />
        <Space h="md" />
        <div id="healthcare-sector">
          <HealthcareSector />
        </div>
        <Space h="md" />
        <Space h="md" />
        <div id="industrials-sector">
          <IndustrialsSector />
        </div>
        <Space h="md" />
        <Space h="md" />
        <div id="materials-sector">
          <MaterialsSector />
        </div>
        <Space h="md" />
        <Space h="md" />
        <div id="real-estate-sector">
          <RealEstateSector />
        </div>
        <Space h="md" />
        <Space h="md" />
        <div id="technology-sector">
          <TechnologySector />
        </div>
        <Space h="md" />
        <Space h="md" />
        <div id="utilities-sector">
          <UtilitiesSector />
        </div>
        <Space h="xl" />
        <Title order={2} c="white" id="personalization-survey">Personalization Survey</Title>
        <Space h="md" />
        <Text c="white">Take a short 10 question survey to get some stock recommendations! </Text>
        <Space h="md" />
        <StockSurveyCard />
        <Space h="xl" />
        <Title order={2} c="white" id="select-company">Select a Company to Analyze</Title>
        <Space h="md" />
        <Text c="white">After doing a bit of research, search up the company you want to analyze! </Text>
        <Space h="md" />
        <Center>
          <TickerSearch />
        </Center>
      </Paper>
    </Container>
  );
}
