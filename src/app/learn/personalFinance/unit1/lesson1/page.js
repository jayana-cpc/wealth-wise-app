"use client";
import { NavBarTemplate } from '@/components/Navbar/NavBarTemplate';
import { Title, Center, Text, Button } from '@mantine/core';
import { Question1 } from '@/components/Learn/PersonalFinanceHome/Unit1/Lesson1/Question1';
import { Question2 } from '@/components/Learn/PersonalFinanceHome/Unit1/Lesson1/Question2';
import { Question3 } from '@/components/Learn/PersonalFinanceHome/Unit1/Lesson1/Question3';
import { useRouter } from 'next/navigation';

export default function Unit1Lesson1() {
  const router = useRouter();
  const handleButtonClick = () => {
      router.push('/learn/personalFinance/unit1/lesson2');
  };
  return (
    <div>
      <NavBarTemplate>
        <Center><Title order={1}>Unit One: Decision Making</Title></Center>
        <Text>
          Welcome to Unit One: Decision Making! In this unit, we will explore how decision-making plays a crucial role in managing your personal finances effectively. 
          Financial decisions impact your savings, investments, and overall financial health, so it&rsquo;s essential to approach them thoughtfully.
        </Text>
        <Title order={2}>Unit 1.1 - Intro to Decision Making</Title>
        <Text>
          <b>Definition of Decision Making:</b> Decision making is the process of making choices between alternative courses of action. 
          In finance, it involves selecting the best option among various financial choices to achieve your goals and minimize risks.
        </Text>
        <Title order={3}>Types of Financial Decisions:</Title>
        <div>
          <ul>
            <li><b>Short-term vs. Long-term:</b> Short-term decisions, like budgeting for monthly expenses, affect your immediate financial situation. Long-term decisions, such as retirement planning, shape your financial future.</li>
            <li><b>Routine vs. Non-routine:</b> Routine decisions include daily spending habits, while non-routine decisions involve major financial choices like buying a home or investing in stocks.</li>
          </ul>
        </div>
        <Title order={3}>Common Pitfalls in Decision Making</Title>
        <div>
          Here are some common pitfalls that individuals fall into:
          <ol>
            <li><b>Impulsivity:</b> Making decisions on a whim without sufficient information or consideration.</li>
            <li><b>Over-reliance on Intuition:</b> Relying solely on gut feelings rather than a structured decision-making process.</li>
          </ol>
        </div>
        <Question1 /> 
        <Question2 />
        <Question3 />
        <Center><Button variant="gradient" gradient={{ from: 'violet', to: 'blue', deg: 153 }} size="compact-md" onClick={handleButtonClick}>Lesson 2</Button></Center>

      </NavBarTemplate>
    </div>
  );
}
