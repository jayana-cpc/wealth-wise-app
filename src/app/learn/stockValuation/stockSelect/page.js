"use client";
import { NavBarTemplate } from '@/components/Navbar/NavBarTemplate';
import {PickStock} from '@/components/Learn/StockValuationHome/StockSelect/PickStock';
export default function Dashboard() {

  return (
    <div>
      <NavBarTemplate>
        <PickStock />
      </NavBarTemplate>
    </div>
  );
}
