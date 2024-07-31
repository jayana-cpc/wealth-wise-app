"use client";
import { NavBarTemplate } from "@/components/Navbar/NavBarTemplate";
import { Center } from "@mantine/core";
import Breadcrumbs from "@/components/General/Breadcrumbs";
import { EquityValueMultiples } from "@/components/Learn/StockValuationHome/EquityValueMultiples/EquityValueMultiples";
export default function Dashboard() {
  return (
    <div>
      <NavBarTemplate>
        <Center>
          <Breadcrumbs
            prevRoute="/learn/stockValuation/enterpriseValueMultiples"
            nextRoute="/learn/stockValuation/discountedCashflowValuation"
          />
        </Center>
        <EquityValueMultiples />
        <Center>
          <Breadcrumbs
            prevRoute="/learn/stockValuation/enterpriseValueMultiples"
            nextRoute="/learn/stockValuation/discountedCashflowValuation"
          />
        </Center>
      </NavBarTemplate>
    </div>
  );
}
