"use client";
import React from 'react';
import { Container, Title, Text, Divider, Center, Paper, Button } from '@mantine/core';
import { NavBarTemplate } from '@/components/Navbar/NavBarTemplate';
import { useRouter } from 'next/navigation';
const Unit1 = () => {
  const router = useRouter();
  const handleButtonClick = () => {
    router.push('/learn/personalFinance/unit2/lesson1');
  };

  return (
    <NavBarTemplate>
      <Container>
        <Paper shadow="sm" p="md">
          
          <Center><Title order={1}>Welcome to Unit Two - Earning Income!</Title></Center>
          <Text>
            In this unit, we’ll explore the world of work and how people earn money. From understanding different types of income to learning about career paths and financial planning, this unit will equip you with the knowledge and skills to make informed decisions about your financial future.
            Get ready to discover how income is generated, the factors that influence earnings, and how to manage your money effectively.
          </Text>

          <Divider my="sm" />

          <Center><Button variant="gradient" gradient={{ from: 'violet', to: 'blue', deg: 153 }} size="md" onClick={handleButtonClick}>Lesson 1</Button></Center>
        </Paper>
      </Container>
    </NavBarTemplate>
  );
};

export default Unit1;
