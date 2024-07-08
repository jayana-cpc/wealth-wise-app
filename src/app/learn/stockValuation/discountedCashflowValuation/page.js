"use client";
import { NavBarTemplate } from '@/components/Navbar/NavBarTemplate';
import { DiscountedCashflowValuation } from '@/components/Learn/StockValuationHome/DiscountedCashflowValuation/DiscountedCashflowValuation';
export default function Dashboard() {
  return (
    <div>
      <NavBarTemplate>
        <DiscountedCashflowValuation />
      </NavBarTemplate>
    </div>
  );
}
