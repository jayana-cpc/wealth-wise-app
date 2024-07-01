"use client";
import { NavBarTemplate } from '@/components/Navbar/NavBarTemplate';
import { PortfolioAdvisorFeatureGrid } from '@/components/PortfolioAdvisorProps/PortfolioAdvisorFeatureGrid';
export default function PortfolioAdvisor() {

  return (
    <div>
      <NavBarTemplate>
        <PortfolioAdvisorFeatureGrid />
      </NavBarTemplate>
    </div>
  );
}
