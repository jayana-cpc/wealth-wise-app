"use client";
import { NavBarTemplate } from "@/components/Navbar/NavBarTemplate";
import { Center } from "@mantine/core";
import { PickStock } from "@/components/Learn/StockValuationHome/StockSelect/PickStock";
import Breadcrumbs from "@/components/General/Breadcrumbs";
export default function Dashboard() {
  return (
    <div>
      <NavBarTemplate>
        <Center>
          <Breadcrumbs nextRoute="/learn/stockValuation/understandingBusiness" />
        </Center>
        <PickStock />
      </NavBarTemplate>
    </div>
  );
}
