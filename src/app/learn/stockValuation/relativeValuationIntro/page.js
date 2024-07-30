"use client";
import { NavBarTemplate } from '@/components/Navbar/NavBarTemplate';
import { Center } from '@mantine/core';
import Breadcrumbs from '@/components/General/Breadcrumbs';
import RelValIntro from '@/components/Learn/StockValuationHome/RelValIntro/RelValIntro';
export default function Dashboard() {
  return (
    <div>
      <NavBarTemplate>
        <Center><Breadcrumbs prevRoute="/learn/stockValuation/understandingBusiness" nextRoute="/learn/stockValuation/enterpriseValueMultiples"/></Center>
        <RelValIntro />
        <Center><Breadcrumbs prevRoute="/learn/stockValuation/understandingBusiness" nextRoute="/learn/stockValuation/enterpriseValueMultiples"/></Center>
      </NavBarTemplate>
    </div>
  );
}
