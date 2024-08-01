"use client";
import React from "react";
import {
  Container,
  Title,
  Text,
  Divider,
  Center,
  Paper,
  Space,
} from "@mantine/core";
import { NavBarTemplate } from "@/components/Navbar/NavBarTemplate";
import { Question1 } from "@/components/Learn/PersonalFinanceHome/Unit1/Lesson3/Question1";
import { Question2 } from "@/components/Learn/PersonalFinanceHome/Unit1/Lesson3/Question2";
import { Question3 } from "@/components/Learn/PersonalFinanceHome/Unit1/Lesson3/Question3";
import Breadcrumbs from "@/components/General/Breadcrumbs";
const Unit1Lesson3 = () => {
  return (
    <NavBarTemplate>
      <Center>
        <Breadcrumbs
          prevRoute="/learn/personalFinance/unit1/lesson2"
          nextRoute="/learn/personalFinance/unit2/lesson1"
        />
      </Center>

      <Container>
        <Paper shadow="sm" p="md">
          <Center>
            <Title order={1}>Unit 1.3 - Opportunity Cost</Title>
          </Center>
          <Divider my="sm" />

          <Text>
            <strong>
              When you make a decision, you always give up something else. This
              is known as the opportunity cost.
            </strong>
          </Text>
          <Space h="sm" />
          <Text>
            Let’s use Aaron’s Saturday dilemma as an example. Aaron used the
            PACED decision-making model and chose to work on his assignment
            instead of going ice skating with Hannah. Why did he choose the
            assignment? Because it was his best option compared to ice skating,
            which was his second-best choice.
          </Text>
          <Space h="sm" />
          <Text>
            The opportunity cost here is the ice skating with Hannah. It’s not
            every other option he didn’t choose, but specifically the
            second-best option he gave up. Aaron only had time for one activity,
            so he had to pick which one to do.
          </Text>
          <Space h="sm" />
          <Text>
            Every decision involves an opportunity cost. Sometimes it’s minor,
            like choosing between a blue or green shirt. If you choose the green
            shirt, the opportunity cost is the blue one. It’s a small,
            low-impact choice.
          </Text>
          <Space h="sm" />
          <Text>
            But for bigger decisions, the opportunity cost can be significant.
            For example, if you decide which car to buy, the opportunity cost of
            choosing Car A is Car B. If you pick Car A for its looks but give up
            Car B for its reliability, you might face more maintenance issues
            later. Similarly, choosing a college for its sports team over one
            with better academics might affect your future career opportunities.
          </Text>
          <Space h="sm" />
          <Text>
            <strong>
              Understanding opportunity cost helps you weigh your options and
              make better decisions.
            </strong>
          </Text>

          <Divider my="sm" />

          <Question1 />
          <Question2 />
          <Question3 />
        </Paper>
        <Divider my="sm" />
        <Center>
          <Breadcrumbs
            prevRoute="/learn/personalFinance/unit1/lesson2"
            nextRoute="/learn/personalFinance/unit2/lesson1"
          />
        </Center>
        <Space h="sm" />
      </Container>
    </NavBarTemplate>
  );
};

export default Unit1Lesson3;
