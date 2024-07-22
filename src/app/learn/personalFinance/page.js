"use client";
import { NavBarTemplate } from '@/components/Navbar/NavBarTemplate';
import {Title, Center } from '@mantine/core'
import { PersonalFinanceCardGrid } from '@/components/Learn/PersonalFinanceHome/PersonalFinanceCourseCardGrid';
export default function PersonalFinance() {

  return (
    <div>
      <NavBarTemplate>
        <Center><Title>Personal Finance Course</Title></Center>
        <Center><PersonalFinanceCardGrid /></Center>
      </NavBarTemplate>
    </div>
  );
}
