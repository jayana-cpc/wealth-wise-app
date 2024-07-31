"use client";
import { NavBarTemplate } from "@/components/Navbar/NavBarTemplate";
import { PortfolioAnalysisProp } from "@/components/PortfolioAdvisorProps/portfolioAnalysisProp";
export default function PortfolioAnalysis() {
  return (
    <div>
      <NavBarTemplate>
        <PortfolioAnalysisProp />
      </NavBarTemplate>
    </div>
  );
}
