"use client";
import { NavBarTemplate } from '@/components/Navbar/NavBarTemplate';
import { Title, Center, Text } from '@mantine/core';

export default function Unit1() {
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
        <Text>
          <ul>
            <li><b>Short-term vs. Long-term:</b> Short-term decisions, like budgeting for monthly expenses, affect your immediate financial situation. Long-term decisions, such as retirement planning, shape your financial future.</li>
            <li><b>Routine vs. Non-routine:</b> Routine decisions include daily spending habits, while non-routine decisions involve major financial choices like buying a home or investing in stocks.</li>
          </ul>
        </Text>
        <Title order={3}>Common Pitfalls in Decision Making</Title>
        <Text>
          Here are some common pitfalls that individuals fall into:
          <ol>
            <li><b>Impulsivity:</b> Making decisions on a whim without sufficient information or consideration.</li>
            <li><b>Over-reliance on Intuition:</b> Relying solely on gut feelings rather than a structured decision-making process.</li>
          </ol>
        </Text>
        <Title order={3}>Question 1:</Title>
        <Text>
          You just received a work bonus. You&apos;ve been wanting a new TV for a while, and this seems like the perfect opportunity to splurge. 
          However, your car needs new tires soon, and you also know you should start saving more for a down payment on a house in a few years. 
          What should you do?
        </Text>
      </NavBarTemplate>
    </div>
  );
}
