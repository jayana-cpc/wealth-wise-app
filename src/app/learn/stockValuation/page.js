"use client";
import { NavBarTemplate } from '@/components/Navbar/NavBarTemplate';
import { ActionsGrid } from '@/components/StockValuationHome/ActionGrid';
export default function Dashboard() {

  return (
    <div>
      <NavBarTemplate>
        <ActionsGrid />
      </NavBarTemplate>
    </div>
  );
}
