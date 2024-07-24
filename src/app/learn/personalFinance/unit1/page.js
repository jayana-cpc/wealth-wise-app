"use client";
import React from 'react';
import { Container, Title, Text, Divider, Center, Paper, Button } from '@mantine/core';
import { NavBarTemplate } from '@/components/Navbar/NavBarTemplate';
import { useRouter } from 'next/navigation';

const Unit1 = () => {
  const router = useRouter();
  const handleButtonClick = () => {
    router.push('/learn/personalFinance/unit1/lesson1');
  };

  return (
    <NavBarTemplate>
      <Container>
        <Paper shadow="sm" p="md">
          <Center><Title order={1}>Unit One: Decision Making</Title></Center>
          <Text>
            Welcome to Unit One: Decision Making! In this unit, we will explore how decision-making plays a crucial role in managing your personal finances effectively. 
            Financial decisions impact your savings, investments, and overall financial health, so it’s essential to approach them thoughtfully.
          </Text>

          <Divider my="sm" />

          <Center><Button variant="gradient" gradient={{ from: 'violet', to: 'blue', deg: 153 }} size="md" onClick={handleButtonClick}>Lesson 1</Button></Center>
        </Paper>
      </Container>
    </NavBarTemplate>
  );
};

export default Unit1;
