"use client";
import { ActionsGrid } from "@/components/Learn/StockValuationHome/ActionGrid";
import { NavBarTemplate } from "@/components/Navbar/NavBarTemplate";
import { HeroImageBackground } from "@/components/Header/CourseHeader";
export default function Dashboard() {
  return (
    <div>
      <NavBarTemplate>
        {/* <HeaderSimple /> */}
        <HeroImageBackground
          title="Wealth Wise: Stock Valuation Course"
          description="In this course, we'll guide you through a step-by-step process
            of stock valuation, empowering you to make informed investment
            decisions. By selecting a company of your choice, you'll learn
            to assess its financial health and growth potential. This knowledge
            will enable you to determine whether the company is a worthy
            addition to your portfolio."
        />
        <ActionsGrid />
      </NavBarTemplate>
    </div>
  );
}

