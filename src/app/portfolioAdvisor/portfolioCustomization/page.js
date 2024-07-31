"use client";
import { NavBarTemplate } from "@/components/Navbar/NavBarTemplate";
import { TickerSearch } from "@/components/PortfolioAdvisorProps/PortfolioCustomization/TickerSearch";
export default function PortfolioAnalysis() {
  return (
    <div>
      <NavBarTemplate>
        <TickerSearch />
      </NavBarTemplate>
    </div>
  );
}
