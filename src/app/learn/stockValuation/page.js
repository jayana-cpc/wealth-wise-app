"use client";
import { NavBarTemplate } from '@/components/Navbar/NavBarTemplate';
import { ActionsGrid } from '@/components/Learn/StockValuationHome/ActionGrid';
import { HeaderSimple } from '@/components/Header/HeaderSimple';
export default function Dashboard() {

  return (
    <div>
      <NavBarTemplate>
        <HeaderSimple />
        <ActionsGrid />

      </NavBarTemplate>
    </div>
  );
}
