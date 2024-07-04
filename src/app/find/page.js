"use client";
import { NavBarTemplate } from '@/components/Navbar/NavBarTemplate';
import PortfolioDisplay from '@/components/Find/PortfolioTracker/portfolioDisplay';
import '@/components/Find/PortfolioTracker/portfolioDisplay.module.scss'
export default function PortfolioDisplayOfficial() {

  return (
    <div>
      <NavBarTemplate>
        <div className= 'body' style={{height: '100%', width: "100%", display: 'flexbox'}}>
            <PortfolioDisplay />
        </div>
      </NavBarTemplate>
    </div>
  );
}
