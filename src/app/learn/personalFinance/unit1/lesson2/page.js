"use client";
import React from 'react';
import { Container, Title, Text, Divider, Center, Paper, List, ListItem, Button, Space } from '@mantine/core';
import { NavBarTemplate } from '@/components/Navbar/NavBarTemplate';
import { PACEDModel } from '@/components/Learn/PersonalFinanceHome/Unit1/Lesson2/PACEDTut';
import { Question1 } from '@/components/Learn/PersonalFinanceHome/Unit1/Lesson2/Question1';
import { Question2 } from '@/components/Learn/PersonalFinanceHome/Unit1/Lesson2/Question2';
import { Question3 } from '@/components/Learn/PersonalFinanceHome/Unit1/Lesson2/Question3';
import { useRouter } from 'next/navigation';

const Unit1Lesson2 = () => {
  const router = useRouter();
  const handleButtonClick = () => {
    router.push('/learn/personalFinance/unit1/lesson3');
  };

  return (
    <NavBarTemplate>
      <Container>
        <Paper shadow="sm" p="md">
          <Center><Title order={2}>Unit 1.2 - PACED Model</Title></Center>
          
          <Text>
            <strong>The PACED Decision-Making Model</strong>
          </Text>
          <Space h="sm" />
          <Text>
            <strong>Objective:</strong> Learn the PACED model and apply it to financial decisions.
          </Text>
          <Space h="sm" />

          <Text>
            <strong>Content:</strong>
          </Text>
          <Space h="sm" />
          <Text>
            There is decision-making, and then there is informed decision-making. Informed decision-making involves careful analysis. Anyone can make a knee-jerk decision—impulsively buying a used car, angrily quitting a job after a difficult shift, or carelessly chasing a ball into the street. If the outcome of such a decision is good, it’s only because the person got lucky.
          </Text>
          <Text>
            Informed decision-making involves weighing the costs and benefits of alternatives. There are several models you can follow to arrive at a logical decision. Some people weigh the pros and cons of each alternative. Some place a dollar value on each alternative (what the alternative is worth to them) and then compare these prices with the actual prices of the alternatives. Some weigh their options according to criteria that are important in the decision. The latter option can be used to weigh the benefits of choices that don’t necessarily involve a purchase, such as choosing an activity after school, so we will concentrate on that option.
          </Text>
          <Text>
            Before moving on to an example, review the PACED decision-making model below. Roll over each step in the process to learn more.
          </Text>
          <Text>
            The PACED model is a structured approach to decision-making that helps you make informed and rational choices. Here’s how it works:
          </Text>
          <Space h="sm" />

          <List>
            <ListItem>
              <strong>Problem:</strong> Clearly define the problem or decision you need to make.
            </ListItem>
            <ListItem>
              <strong>Alternatives:</strong> Identify the possible options available.
            </ListItem>
            <ListItem>
              <strong>Criteria:</strong> Establish criteria to evaluate the alternatives.
            </ListItem>
            <ListItem>
              <strong>Evaluate:</strong> Assess each alternative based on the criteria.
            </ListItem>
            <ListItem>
              <strong>Decide:</strong> Make the final decision based on the evaluation.
            </ListItem>
          </List>

          <Divider my="sm" />

          <Text>
            <strong>Interactive Element:</strong>
          </Text>
          <Space h="sm" />

          <List>
            <ListItem>
              <strong>Interactive Tutorial:</strong> Follow a step-by-step tutorial where you apply the PACED model to a financial decision. For example, choosing between different credit card offers. Input your problem, alternatives, and criteria into interactive fields. The tutorial will guide you through evaluating each alternative and making your decision, with feedback provided at each step.
            </ListItem>
          </List>
          <Space h="sm" />

          <PACEDModel />
          <Space h="sm" />

          <Question1 />
          <Space h="sm" />

          <Question2 />
          <Space h="sm" />

          <Question3 />
          <Space h="sm" />


          <Divider my="sm" />

          <Center><Button variant="gradient" gradient={{ from: 'violet', to: 'blue', deg: 153 }} size="md" onClick={handleButtonClick}>Lesson 3</Button></Center>
        </Paper>

      </Container>
    </NavBarTemplate>
  );
};

export default Unit1Lesson2;
