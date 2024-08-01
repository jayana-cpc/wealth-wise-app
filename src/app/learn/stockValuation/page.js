"use client";
import { ActionsGrid } from "@/components/Learn/StockValuationHome/ActionGrid";
import { HeaderSimple } from "@/components/Header/HeaderSimple";
import { Stepper, Center, Space } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { NavBarTemplate } from "@/components/Navbar/NavBarTemplate";
import { HeroImageBackground } from "@/components/Header/CourseHeader";
export default function Dashboard() {
  const router = useRouter();
  const [hoveredStep, setHoveredStep] = useState(-1);

  const navigateToStep = (step) => {
    switch (step) {
      case 1:
        router.push("/learn/stockValuation/understandingBusiness");
        break;
      case 2:
        router.push("/learn/stockValuation/relativeValuationIntro");
        break;
      case 3:
        router.push("/learn/stockValuation/enterpriseValueMultiples");
        break;
      case 4:
        router.push("/learn/stockValuation/equityValueMultiples");
        break;
      case 5:
        router.push("/learn/stockValuation/discountedCashflowValuation");
        break;
      default:
        router.push("/learn/stockValuation/stockSelect");
    }
  };

  const handleMouseEnter = (step) => {
    setHoveredStep(step);
  };

  const handleMouseLeave = () => {
    setHoveredStep(-1);
  };
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
