"use client";
import { NavBarTemplate } from "@/components/Navbar/NavBarTemplate";
import { Center } from "@mantine/core";
import { PersonalFinanceCardGrid } from "@/components/Learn/PersonalFinanceHome/PersonalFinanceCourseCardGrid";
import { HeroImageBackground } from "@/components/Header/CourseHeader";
export default function PersonalFinance() {
  return (
    <div>
      <NavBarTemplate>
        <HeroImageBackground
          title="Wealth Wise: Personal Finance Course"
          description="The course takes you through an interactive journey learning not only about personal finance concepts but also how to implement them directly into your life "
        />
        <Center>
          <PersonalFinanceCardGrid />
        </Center>
      </NavBarTemplate>
    </div>
  );
}
