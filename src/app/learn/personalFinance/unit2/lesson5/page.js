"use client";
import React from "react";
import {
  Container,
  Title,
  Text,
  Divider,
  Paper,
  List,
  ListItem,
  Center,
} from "@mantine/core";
import { NavBarTemplate } from "@/components/Navbar/NavBarTemplate";
import { Question1 } from "@/components/Learn/PersonalFinanceHome/Unit2/Lesson5/Question1";
import { Question2 } from "@/components/Learn/PersonalFinanceHome/Unit2/Lesson5/Question2";
import Breadcrumbs from "@/components/General/Breadcrumbs";
const Unit2Lesson5 = () => {
  return (
    <NavBarTemplate>
      <Container>
        <Center>
          <Breadcrumbs
            prevRoute="/learn/personalFinance/unit2/lesson4"
            nextRoute="/learn/personalFinance/unit3/lesson1"
          />
        </Center>

        <Paper shadow="sm" p="md">
          <Center>
            <Title order={1}>Unit 2.5 - Introduction to Tax Returns</Title>
          </Center>

          <Divider my="sm" />

          <Title order={2}>Understanding Tax Returns</Title>

          <Text>
            Tax returns are forms you submit to the government to report your
            income, calculate your tax liability, and determine whether you owe
            taxes or are due a refund. Understanding the different types of tax
            forms is crucial as they vary in complexity based on your financial
            situation:
          </Text>
          <List withPadding>
            <ListItem>
              <Text>
                <strong>Form 1040:</strong> This is the standard form used by
                most taxpayers. It allows you to report various types of income,
                deductions, and credits. For example, if you have income from
                wages, interest, dividends, and retirement distributions, you
                would use Form 1040 to report all these sources.
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <strong>Form 1040A:</strong> A simpler version of Form 1040, it
                allows for fewer types of income and deductions. You might use
                Form 1040A if your income primarily comes from wages, interest,
                dividends, and retirement distributions, and you claim the
                standard deduction.
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <strong>Form 1040-EZ:</strong> The easiest form, used by
                taxpayers with very simple tax situations. You can use Form
                1040-EZ if your taxable income is below $100,000, your filing
                status is single or married filing jointly, you don&apos;t claim
                any dependents, and your interest income is less than $1,500.
              </Text>
            </ListItem>
          </List>

          <Divider my="sm" />

          <Title order={2}>Gathering Necessary Documents</Title>
          <Text>
            Before you can file your tax return, you need to gather all relevant
            documents. These documents provide the information you need to
            accurately report your income and deductions:
          </Text>
          <List withPadding>
            <ListItem>
              <Text>
                <strong>W-2 Forms:</strong> These forms are provided by your
                employer and report your wages and the taxes withheld from your
                paycheck. For example, if you worked multiple jobs throughout
                the year, you would receive a W-2 from each employer.
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <strong>1099 Forms:</strong> If you earned income as an
                independent contractor or freelancer, you would receive a Form
                1099 from each client or company you worked for. For example, if
                you worked as a freelance graphic designer and earned income
                from multiple clients, each client would issue you a Form
                1099-MISC.
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <strong>Other Income Statements:</strong> These include
                statements for income such as interest (Form 1099-INT),
                dividends (Form 1099-DIV), and retirement distributions (Form
                1099-R).
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <strong>Deduction Statements:</strong> These documents support
                deductions you may qualify for, such as mortgage interest
                statements (Form 1098), charitable contribution receipts, and
                medical expense records.
              </Text>
            </ListItem>
          </List>
          <Text>
            By gathering these documents, you ensure that you have all the
            necessary information to complete your tax return accurately.
          </Text>

          <Divider my="sm" />

          <Title order={2}>Standard Deduction vs. Itemized Deductions</Title>
          <Text>
            When filing your tax return, you have the option to take either the
            standard deduction or to itemize deductions:
          </Text>
          <List withPadding>
            <ListItem>
              <Text>
                <strong>Standard Deduction:</strong> This is a fixed amount that
                reduces your taxable income. For example, in tax year 2023, the
                standard deduction for a single filer is $12,950, and for
                married couples filing jointly, it&apos;s $25,900. You would
                choose the standard deduction if it exceeds the total amount you
                could claim through itemized deductions.
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <strong>Itemized Deductions:</strong> These are expenses you
                incurred during the tax year that you can subtract from your
                adjusted gross income to reduce your taxable income further.
                Common itemized deductions include mortgage interest, state and
                local taxes, charitable contributions, and medical expenses. For
                example, if you paid $8,000 in mortgage interest, $5,000 in
                state income taxes, and $2,000 in charitable contributions,
                totaling $15,000, you may choose to itemize deductions if this
                amount exceeds your standard deduction.
              </Text>
            </ListItem>
          </List>
          <Text>
            Choosing between the standard deduction and itemizing depends on
            which option lowers your taxable income the most, thereby reducing
            your tax liability.
          </Text>

          <Divider my="sm" />

          <Title order={2}>Tax Credits</Title>
          <Text>
            Tax credits are valuable because they directly reduce the amount of
            tax you owe:
          </Text>
          <List withPadding>
            <ListItem>
              <Text>
                <strong>Child Tax Credit:</strong> A credit of up to $2,000 per
                qualifying child under the age of 17. For example, if you have
                two qualifying children, you could potentially claim a $4,000
                Child Tax Credit, which directly reduces your tax liability.
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <strong>Earned Income Tax Credit (EITC):</strong> This credit is
                designed for low to moderate-income earners. It is refundable,
                meaning you can receive a refund even if you don&apos;t owe any
                taxes. For example, if you qualify for the EITC based on your
                income and family size, you could receive a refund of up to
                $6,728 for tax year 2023.
              </Text>
            </ListItem>
          </List>
          <Text>
            To claim tax credits, you must meet specific eligibility
            requirements and complete the necessary forms accurately.
          </Text>

          <Divider my="sm" />

          <Title order={2}>Filing Status</Title>
          <Text>
            Your filing status determines your filing requirements, standard
            deduction amount, and eligibility for certain tax credits and
            deductions:
          </Text>
          <List withPadding>
            <ListItem>
              <Text>
                <strong>Single:</strong> This filing status applies if you are
                unmarried, divorced, or legally separated according to state law
                as of December 31 of the tax year.
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <strong>Married Filing Jointly:</strong> If you are married, you
                can choose to file jointly with your spouse. This filing status
                combines your incomes and deductions. For example, if you and
                your spouse both work and have children, filing jointly may
                result in a lower tax liability than filing separately.
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <strong>Head of Household:</strong> This filing status generally
                applies if you are unmarried, paid more than half the cost of
                keeping up a home for the year, and have a qualifying person
                living with you for more than half the year. For example, if you
                are single, have a child, and provide more than half of the
                household expenses, you may qualify for the Head of Household
                filing status.
              </Text>
            </ListItem>
          </List>
          <Text>
            Choosing the correct filing status ensures you pay the right amount
            of taxes and can maximize your tax benefits.
          </Text>

          <Divider my="sm" />

          <Title order={2}>Using Tax Software</Title>
          <Text>
            Tax preparation software simplifies the process of preparing and
            filing your tax return:
          </Text>
          <List withPadding>
            <ListItem>
              <Text>
                <strong>Guided Preparation:</strong> These programs guide you
                through each step of the tax return process, asking questions to
                ensure you provide all necessary information.
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <strong>Electronic Filing (e-file):</strong> Most tax software
                allows you to file your tax return electronically, which is
                secure and results in faster processing of your refund, if
                applicable.
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <strong>Error Checking:</strong> These programs have built-in
                error-checking features to help identify common mistakes, such
                as mathematical errors or missing information.
              </Text>
            </ListItem>
          </List>
          <Text>
            Many tax software options offer free filing options for taxpayers
            with simple tax situations, making it accessible and convenient for
            many filers.
          </Text>

          <Divider my="sm" />
          <Question1 />
          <Question2 />

          <Center>
            <Breadcrumbs
              prevRoute="/learn/personalFinance/unit2/lesson4"
              nextRoute="/learn/personalFinance/unit3/lesson1"
            />
          </Center>
        </Paper>
      </Container>
    </NavBarTemplate>
  );
};

export default Unit2Lesson5;
