"use client";
import React, { useState } from 'react';
import { NavBarTemplate } from "@/components/Navbar/NavBarTemplate";
import { StockDisplay } from "@/components/Find/PortfolioTracker/StockDisplay";
import FindHeader from "@/components/Find/FindHeader";
import PortfolioVisualizations from '@/components/Find/PortfolioVisualizations';
export default function PortfolioDisplayOfficial() {

  const [activeTab, setActiveTab] = useState('priceTracker');
  return (
    <div>
      <NavBarTemplate>
        <FindHeader activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === 'priceTracker' && <StockDisplay />}
        {activeTab === 'portfolioVisualizations' && <PortfolioVisualizations />}
        {activeTab === 'portfolioTracker' && <div>Portfolio Tracker Component</div>}
      </NavBarTemplate>
    </div>
  );
}
