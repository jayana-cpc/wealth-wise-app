import React from 'react';
import { Title, Center, Text } from '@mantine/core';
import { SectorCarousel } from './sectorCarousel';
import '@mantine/carousel/styles.css';
import { StockSurveyCard } from '@/components/Dashboard/StockSurveyCard';
import { TickerSearch } from './TickerSearchLearn';
export function PickStock() {
  return (
    <>
      <Center>
        <Title order={1} >Stock Selection</Title>
      </Center>
      <Center>
        <Text>Lets begin the stock valuation journey with selecting the company we want to value!</Text>
      </Center>
      <Center>
        <Title order={2} >The 11 GICS Sectors</Title>
      </Center>
      <Center><SectorCarousel /></Center>
      <Center>
        <Text>Still wondering which company to analyze. Take our personalization survey!</Text>
      </Center>
      <Center>
        <StockSurveyCard />
      </Center>
      <Center>
        <Text>Ready to choose your company!</Text>
      </Center>
      <Center>
        <TickerSearch />
      </Center>


      

    </>
  );
}