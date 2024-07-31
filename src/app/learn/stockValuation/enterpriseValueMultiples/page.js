"use client";
import { NavBarTemplate } from "@/components/Navbar/NavBarTemplate";
import { Center } from "@mantine/core";
import Breadcrumbs from "@/components/General/Breadcrumbs";
import { EnterpriseValueMultiples } from "@/components/Learn/StockValuationHome/EnterpriseValueMultiples/EnterpriseValueMultiples";
export default function Dashboard() {
  return (
    <div>
      <NavBarTemplate>
        <Center>
          <Breadcrumbs
            prevRoute="/learn/stockValuation/relativeValuationIntro"
            nextRoute="/learn/stockValuation/equityValueMultiples"
          />
        </Center>
        <EnterpriseValueMultiples />
        <Center>
          <Breadcrumbs
            prevRoute="/learn/stockValuation/relativeValuationIntro"
            nextRoute="/learn/stockValuation/equityValueMultiples"
          />
        </Center>
      </NavBarTemplate>
    </div>
  );
}
