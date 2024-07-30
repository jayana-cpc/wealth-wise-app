"use client";
import React from 'react';
import { Container, Title, Text, Divider, Center, Paper, Button, List, ListItem, Group } from '@mantine/core';
import { NavBarTemplate } from '@/components/Navbar/NavBarTemplate';
import { Question1 } from '@/components/Learn/PersonalFinanceHome/Unit1/Lesson1/Question1';
import { Question2 } from '@/components/Learn/PersonalFinanceHome/Unit1/Lesson1/Question2';
import { Question3 } from '@/components/Learn/PersonalFinanceHome/Unit1/Lesson1/Question3';
import { useRouter } from 'next/navigation';
import Breadcrumbs from '@/components/General/Breadcrumbs';
const Unit1Lesson1 = () => {
  const router = useRouter();
  const handleButtonClick = () => {
    router.push('/learn/personalFinance/unit1/lesson2');
  };

  return (
    <NavBarTemplate>
      <Center><Breadcrumbs prevRoute="/learn/personalFinance/unit1" nextRoute="/learn/personalFinance/unit1/lesson2"/></Center>

      <Container>
        
        <Paper shadow="sm" p="md">
          <Center><Title order={1}>Unit 1.1 - Intro to Decision Making</Title></Center>
          <Text>
            <strong>Definition of Decision Making:</strong> Decision making is the process of making choices between alternative courses of action. 
            In finance, it involves selecting the best option among various financial choices to achieve your goals and minimize risks.
          </Text>

          <Divider my="sm" />

          <Title order={3}>Types of Financial Decisions:</Title>
          <List withPadding>
            <ListItem>
              <strong>Short-term vs. Long-term:</strong> Short-term decisions, like budgeting for monthly expenses, affect your immediate financial situation. Long-term decisions, such as retirement planning, shape your financial future.
            </ListItem>
            <ListItem>
              <strong>Routine vs. Non-routine:</strong> Routine decisions include daily spending habits, while non-routine decisions involve major financial choices like buying a home or investing in stocks.
            </ListItem>
          </List>

          <Divider my="sm" />

          <Title order={3}>Common Pitfalls in Decision Making</Title>
          <Text>Here are some common pitfalls that individuals fall into:</Text>
          <List withPadding type="ordered">
            <ListItem>
              <strong>Impulsivity:</strong> Making decisions on a whim without sufficient information or consideration.
            </ListItem>
            <ListItem>
              <strong>Over-reliance on Intuition:</strong> Relying solely on gut feelings rather than a structured decision-making process.
            </ListItem>
          </List>

          <Divider my="sm" />

          <Question1 /> 
          <Question2 />
          <Question3 />
          <Divider my="sm" />

          <Center><Button variant="gradient" gradient={{ from: 'violet', to: 'blue', deg: 153 }} size="md" onClick={handleButtonClick}>Lesson 2</Button></Center>
        </Paper>

      </Container>
    </NavBarTemplate>
  );
};

export default Unit1Lesson1;
