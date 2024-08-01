"use client";
import React from "react";
import {
  Container,
  Title,
  Text,
  Divider,
  Paper,
  Center,
  Space,
} from "@mantine/core";
import { NavBarTemplate } from "@/components/Navbar/NavBarTemplate";
import PayStubQuiz from "@/components/Learn/PersonalFinanceHome/Unit4/PayStubQuiz";
import Breadcrumbs from "@/components/General/Breadcrumbs";
const Unit4Lesson1 = () => {
  return (
    <NavBarTemplate>
      <Container>
        <Center>
          <Breadcrumbs
            prevRoute="/learn/personalFinance/unit3/lesson2"
            nextRoute="/learn/personalFinance/unit4/lesson2"
          />
        </Center>
        <Paper shadow="sm" p="md">
          <Center>
            <Title order={1}>Unit 4.1 - Allocating Pay</Title>
          </Center>

          <Divider my="sm" />

          <Title order={2}>Understanding Pay</Title>

          <Text>
            We&apos;ll start with a quick review of a few key definitions that
            we learned in Unit Two - Earning Income:
          </Text>
          <Text>
            <strong>Gross pay</strong> is your total earnings before any taxes
            or other deductions are taken out. It&apos;s the amount you&apos;ve
            earned for your work.
          </Text>
          <Text>
            However, the number that really matters is your{" "}
            <strong>net pay</strong> – the amount you actually take home.
            Examples of deductions include Social Security tax, Medicare tax,
            income tax, and optional deductions such as insurance premiums.
          </Text>

          <Divider my="sm" />

          <Title order={2}>Disposable Income</Title>
          <Text>
            Here&apos;s a new definition that you may be unfamiliar with:{" "}
            <strong>Disposable Income</strong>.
          </Text>
          <Text>
            Disposable income is the money you have left after taxes and other
            deductions have been taken out of your net pay. In other words,
            it&apos;s the amount of money you have available to spend on goods
            and services, save, or invest as you choose. It represents your
            financial resources after accounting for necessary expenses such as
            taxes, housing costs, and essential living expenses.
          </Text>
          <Text>
            Understanding disposable income is crucial for managing personal
            finances effectively. It provides insight into your discretionary
            spending power and your capacity to save for future goals,
            emergencies, or larger purchases.
          </Text>

          <Divider my="sm" />

          <Title order={2}>Example</Title>
          <Text>Let&apos;s put this into context:</Text>
          <Text>
            Imagine your gross pay is $4,000 per month. After deductions for
            taxes, insurance, and other obligations, your net pay might be
            $3,200. From this net pay, if you have additional expenses such as
            rent or mortgage payments totaling $1,200 per month, your disposable
            income would be the remaining $2,000 ($3,200 - $1,200).
          </Text>
          <Text>
            This $2,000 represents the amount you can use for non-essential
            spending, savings, investments, or other personal financial goals.
            It&apos;s important to manage this disposable income wisely to
            ensure financial stability and achieve long-term financial
            objectives.
          </Text>

          <Divider my="sm" />

          <Title order={2}>Summary</Title>
          <Text>
            In summary, while gross pay indicates total earnings before
            deductions and net pay reflects what you actually receive after
            deductions, disposable income offers a practical view of your
            financial flexibility and ability to make choices about how to
            allocate your earnings beyond mandatory expenses. Understanding and
            effectively managing disposable income is key to achieving financial
            well-being.
          </Text>
          <Space h="md" />
          <Divider my="sm" />

          <PayStubQuiz />
          <Space h="md" />
          <Divider my="sm" />
          <Center>
            <Breadcrumbs
              prevRoute="/learn/personalFinance/unit3/lesson2"
              nextRoute="/learn/personalFinance/unit4/lesson2"
            />
          </Center>
        </Paper>
      </Container>
    </NavBarTemplate>
  );
};

export default Unit4Lesson1;
