"use client";
import { NavBarTemplate } from '@/components/Navbar/NavBarTemplate';
import { UnderstandingBusiness } from '@/components/StockValuationHome/UnderstandingBusiness/UnderstandingBusiness';
export default function Dashboard() {
  return (
    <div>
      <NavBarTemplate>
        <UnderstandingBusiness />
      </NavBarTemplate>
    </div>
  );
}
