"use client";
import { FeatureCardsGrid } from '@/components/Dashboard/FeatureCardsGrid';
import { NavBarTemplate } from '@/components/Navbar/NavBarTemplate';

export default function PortfolioAdvisor() {

  return (
    <div>
      <NavBarTemplate>
        <FeatureCardsGrid />
      </NavBarTemplate>
    </div>
  );
}
