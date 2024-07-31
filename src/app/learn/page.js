"use client";
import { NavBarTemplate } from "@/components/Navbar/NavBarTemplate";
import { LearnFeatureCardsGrid } from "@/components/Learn/LearnFeatureCardsGrid";
export default function Learn() {
  return (
    <div>
      <NavBarTemplate>
        <LearnFeatureCardsGrid />
      </NavBarTemplate>
    </div>
  );
}
