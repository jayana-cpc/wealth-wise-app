"use client";
import { NavBarTemplate } from '@/components/Navbar/NavBarTemplate';
import { ActionsGrid } from '@/components/Learn/StockValuationHome/ActionGrid';
export default function Dashboard() {

  return (
    <div>
      <NavBarTemplate>
        <ActionsGrid />
      </NavBarTemplate>
    </div>
  );
}
