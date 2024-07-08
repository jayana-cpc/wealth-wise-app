"use client";
import { NavBarTemplate } from '@/components/Navbar/NavBarTemplate';
import RelValIntro from '@/components/Learn/StockValuationHome/RelValIntro/RelValIntro';
export default function Dashboard() {
  return (
    <div>
      <NavBarTemplate>
        <RelValIntro />
      </NavBarTemplate>
    </div>
  );
}
