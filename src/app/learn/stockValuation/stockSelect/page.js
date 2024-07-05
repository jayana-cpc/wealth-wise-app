"use client";
import { NavBarTemplate } from '@/components/Navbar/NavBarTemplate';
import {PickStock} from '@/components/StockValuationHome/StockSelect/PickStock';
export default function Dashboard() {

  return (
    <div>
      <NavBarTemplate>
        <PickStock />
      </NavBarTemplate>
    </div>
  );
}
