"use client";
import { NavBarTemplate } from '@/components/Navbar/NavBarTemplate';
import { EnterpriseValueMultiples } from '@/components/StockValuationHome/EnterpriseValueMultiples/EnterpriseValueMultiples';
export default function Dashboard() {
  return (
    <div>
      <NavBarTemplate>
        <EnterpriseValueMultiples />
      </NavBarTemplate>
    </div>
  );
}
