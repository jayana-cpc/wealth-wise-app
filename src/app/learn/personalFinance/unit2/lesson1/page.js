"use client";
import React from 'react';
import { Container, Title, Text, List, ListItem, Divider, Center, Paper, Button } from '@mantine/core';
import { NavBarTemplate } from '@/components/Navbar/NavBarTemplate';
import { useRouter } from 'next/navigation';
import { Question1 } from '@/components/Learn/PersonalFinanceHome/Unit2/Lesson1/Question1';
import { Question2 } from '@/components/Learn/PersonalFinanceHome/Unit2/Lesson1/Question2';
import { Question3 } from '@/components/Learn/PersonalFinanceHome/Unit2/Lesson1/Question3';
import Breadcrumbs from '@/components/General/Breadcrumbs';
const Unit1Lesson1 = () => {
  const router = useRouter();
  const handleButtonClick = () => {
    router.push('/learn/personalFinance/unit2/lesson2');
  };

  return (
    <NavBarTemplate>
      <Center><Breadcrumbs prevRoute="/learn/personalFinance/unit2" nextRoute="/learn/personalFinance/unit2/lesson3"/></Center>

      <Container>
        <Paper shadow="sm" p="md">
          <Center><Title order={1}>Unit 2.1 - The Power of Human Capital</Title></Center>
          <Text>
            Your earning potential is significantly influenced by your human capital - the skills, knowledge, and experience you possess. 
            It&apos;s akin to building a strong foundation for your financial future.
          </Text>

          <Divider my="sm" />

          <Title order={2}>The Human Capital-Income Connection</Title>
          <Text>Let&apos;s delve deeper into the relationship between human capital and income.</Text>
          <List withPadding>
            <ListItem>
              <Text>
                <strong>Productivity and Wages:</strong> Individuals with higher levels of human capital tend to be more productive. They can complete tasks more efficiently, innovate, and solve problems effectively. This increased productivity often translates to higher wages and better job opportunities.
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <strong>Occupational Demand:</strong> Certain occupations require specialized skills and knowledge. As demand for these skills grows, so too do the wages associated with those occupations. For instance, the rising demand for technology skills has driven up salaries for software engineers and data scientists.
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <strong>Lifelong Learning:</strong> The job market is constantly evolving. Investing in ongoing education and training helps individuals adapt to new challenges and acquire in-demand skills. This continuous investment in human capital can lead to career advancement and higher earnings over time.
              </Text>
            </ListItem>
          </List>

          <Divider my="sm" />

          <Title order={2}>Understanding Median Income</Title>
          <Text>
            While average income can be skewed by outliers (extremely high or low incomes), the <strong>median income</strong> provides a more accurate representation of typical earnings within a group. By focusing on the middle value, we can better understand how education and experience impact income levels for the majority of people.
          </Text>
          <Text>
            For example, consider two groups of workers: one with a high school diploma and another with a bachelor&apos;s degree. While there might be a few high-earning individuals in both groups, the median income for the group with bachelor&apos;s degrees will generally be higher. This indicates that education level is a strong predictor of income.
          </Text>
          <Text>
            <strong>Let&apos;s explore a real-world example:</strong> Imagine two individuals, both working in the same industry. One has a high school diploma and primarily performs routine tasks, while the other has a college degree and holds a managerial position. The college graduate, with their higher level of human capital, is likely to earn a significantly higher salary due to their ability to handle complex problems, lead teams, and contribute strategically to the organization.
          </Text>

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
