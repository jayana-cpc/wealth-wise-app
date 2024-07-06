"use client";
import { NavBarTemplate } from '@/components/Navbar/NavBarTemplate';
import { EquityValueMultiples } from '@/components/StockValuationHome/EquityValueMultiples/EquityValueMultiples';
export default function Dashboard() {
  return (
    <div>
      <NavBarTemplate>
        <EquityValueMultiples />
      </NavBarTemplate>
    </div>
  );
}
