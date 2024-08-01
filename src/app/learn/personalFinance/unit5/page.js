"use client";
import React from "react";
import { Container, Title, Text, Divider, Paper, Center } from "@mantine/core";
import { NavBarTemplate } from "@/components/Navbar/NavBarTemplate";

const Unit5 = () => {
  return (
    <NavBarTemplate>
      <Container>
        <Paper shadow="sm" p="md">
          <Center>
            <Title order={1}>Welcome to Unit Five - Using Credit!</Title>
          </Center>

          <Divider my="sm" />
          <Text>
            In this unit, you will explore the concept of credit and its various
            forms. Credit is defined as the ability to obtain goods or services
            before payment, based on the trust that full payment will be made in
            the future, typically with added interest. You will learn about the
            different types of credit, including credit cards, mortgages, auto
            loans, and student loans, each serving distinct purposes and
            offering various benefits. Understanding how credit works will help
            you grasp the importance of managing debt responsibly and
            recognizing the cost associated with borrowing money.
          </Text>
        </Paper>
      </Container>
    </NavBarTemplate>
  );
};

export default Unit5;
