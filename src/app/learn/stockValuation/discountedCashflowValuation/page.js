"use client";
import { NavBarTemplate } from '@/components/Navbar/NavBarTemplate';
import { DiscountedCashflowValuation } from '@/components/StockValuationHome/DiscountedCashflowValuation/DiscountedCashflowValuation';
export default function Dashboard() {
  return (
    <div>
      <NavBarTemplate>
        <DiscountedCashflowValuation />
      </NavBarTemplate>
    </div>
  );
}
