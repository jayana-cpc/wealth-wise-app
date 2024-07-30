"use client";
import { NavBarTemplate } from '@/components/Navbar/NavBarTemplate';
import { Center } from '@mantine/core';
import Breadcrumbs from '@/components/General/Breadcrumbs';
import { DiscountedCashflowValuation } from '@/components/Learn/StockValuationHome/DiscountedCashflowValuation/DiscountedCashflowValuation';
export default function Dashboard() {
  return (
    <div>
      <NavBarTemplate>
        <Center><Breadcrumbs prevRoute="/learn/stockValuation/equityValueMultiples" /></Center>
        <DiscountedCashflowValuation />
        <Center><Breadcrumbs prevRoute="/learn/stockValuation/equityValueMultiples" /></Center>
      </NavBarTemplate>
    </div>
  );
}
