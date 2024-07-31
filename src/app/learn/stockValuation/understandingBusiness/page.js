"use client";
import { NavBarTemplate } from "@/components/Navbar/NavBarTemplate";
import { Center } from "@mantine/core";
import Breadcrumbs from "@/components/General/Breadcrumbs";

import { UnderstandingBusiness } from "@/components/Learn/StockValuationHome/UnderstandingBusiness/UnderstandingBusiness";
export default function Dashboard() {
  return (
    <div>
      <NavBarTemplate>
        <Center>
          <Breadcrumbs
            prevRoute="/learn/stockValuation/stockSelect"
            nextRoute="/learn/stockValuation/relativeValuationIntro"
          />
        </Center>
        <UnderstandingBusiness />
        <Center>
          <Breadcrumbs
            prevRoute="/learn/stockValuation/stockSelect"
            nextRoute="/learn/stockValuation/relativeValuationIntro"
          />
        </Center>
      </NavBarTemplate>
    </div>
  );
}
