"use client";
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
        <HeroImageBackground
          title="Wealth Wise: Stock Valuation Course"
          description="In this course, we'll guide you through a step-by-step process
            of stock valuation, empowering you to make informed investment
            decisions. By selecting a company of your choice, you'll learn
            to assess its financial health and growth potential. This knowledge
            will enable you to determine whether the company is a worthy
            addition to your portfolio."
        />
        <Space h="xl" />
        <Center>
          <Stepper
            orientation="vertical"
            iconSize={32}
            active={hoveredStep}
            onStepClick={navigateToStep}
          >
            <Stepper.Step
              label="Stock Selection"
              description="Choose the first company you want to analyze."
              onMouseEnter={() => handleMouseEnter(0)}
              onMouseLeave={handleMouseLeave}
            ></Stepper.Step>
            <Stepper.Step
              label="Understand the Business"
              description="Understand how the company functions."
              onMouseEnter={() => handleMouseEnter(1)}
              onMouseLeave={handleMouseLeave}
            ></Stepper.Step>
            <Stepper.Step
              label="Intro to Relative Valuation"
              description="Understand the basis for relative valuation"
              onMouseEnter={() => handleMouseEnter(2)}
              onMouseLeave={handleMouseLeave}
            ></Stepper.Step>
            <Stepper.Step
              label="Enterprise Value Multiples"
              description="Analyze your company against two others using enterprise multiples."
              onMouseEnter={() => handleMouseEnter(3)}
              onMouseLeave={handleMouseLeave}
            ></Stepper.Step>
            <Stepper.Step
              label="Equity Value Multiples"
              description="Analyze your company against two others using equity multiples."
              onMouseEnter={() => handleMouseEnter(4)}
              onMouseLeave={handleMouseLeave}
            ></Stepper.Step>
            <Stepper.Step
              label="Discounted Cashflow Valuation"
              description="Perform intrinsic valuation using a DCF Model."
              onMouseEnter={() => handleMouseEnter(5)}
              onMouseLeave={handleMouseLeave}
            ></Stepper.Step>
          </Stepper>
        </Center>
      </NavBarTemplate>
    </div>
  );
}
