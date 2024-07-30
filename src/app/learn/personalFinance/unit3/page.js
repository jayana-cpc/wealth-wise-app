"use client";
import React from 'react';
import { Container, Title, Text, Divider, Center, Paper, Button, Space } from '@mantine/core';
import { NavBarTemplate } from '@/components/Navbar/NavBarTemplate';
import { useRouter } from 'next/navigation';
const Unit3 = () => {
  const router = useRouter();
  const handleButtonClick = () => {
    router.push('/learn/personalFinance/unit3/lesson1');
  };

  return (
    <NavBarTemplate>

      <Container>
        <Paper shadow="sm" p="md">
          <Center><Title order={1}>Welcome to Unit Three- Buying Goods and Services!</Title></Center>
          <Space h="md" />
          <Text>
          What makes prices go up and down? Do candy companies hold secret meetings to set prices? Or does the government dictate how much you pay? 
          The truth is, something else entirely determines the cost of most goods and services.
          </Text>
          <Space h="md" />
          <Text>
          It&apos;s not magic, but it might seem like it: supply and demand. These two economic forces work together to set prices. 
          </Text>
          <Space h="md" />
          <Text>
          To better understand how demand affects prices, let&apos;s explore a fictional chocolate market.
          </Text>
          <Divider my="sm" />
          <Center><Button variant="gradient" gradient={{ from: 'violet', to: 'blue', deg: 153 }} size="md" onClick={handleButtonClick}>Lesson 1</Button></Center>
        </Paper>
      </Container>
    </NavBarTemplate>
  );
};

export default Unit3;
