"use client";
import { NavBarTemplate } from '@/components/Navbar/NavBarTemplate';
// import PortfolioDisplay from '@/components/Find/PortfolioTracker/portfolioDisplay';
// import '@/components/Find/PortfolioTracker/portfolioDisplay.module.scss'
import { Container, Center } from '@mantine/core';
import { DefinitionCard } from '@/components/General/DefinitionCard';
export default function PortfolioDisplayOfficial() {

  return (
    <div>
      <NavBarTemplate>
        <Container>
          <Center>
            <DefinitionCard 
              word="Gross Pay" 
              definition="Your total earnings before any taxes or other deductions are taken out. It's the amount you've earned for your work."
              />
          </Center>
        </Container>
      </NavBarTemplate>
    </div>
  );
}
