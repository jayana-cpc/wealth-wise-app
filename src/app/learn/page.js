"use client";
import { NavBarTemplate } from '@/components/Navbar/NavBarTemplate';
import { LearnFeatureCardsGrid } from '@/components/Learn/LearnFeatureCardsGrid';
import { HeaderSimple } from '@/components/Header/HeaderSimple';
export default function Learn() {

  return (
    <div>
      
      <NavBarTemplate>
        
        <LearnFeatureCardsGrid />
      </NavBarTemplate>
    </div>
  );
}
