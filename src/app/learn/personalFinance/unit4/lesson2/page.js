"use client";
import React, { useState } from "react";
import {
  Container,
  Title,
  Text,
  Divider,
  Paper,
  List,
  ListItem,
  Center,
  Button,
  Modal,
  Space,
} from "@mantine/core";
import { NavBarTemplate } from "@/components/Navbar/NavBarTemplate";
import Budget from "@/components/Learn/PersonalFinanceHome/Unit4/BudgetSheet";
import Breadcrumbs from "@/components/General/Breadcrumbs";
const budgetingTools = [
  {
    tool: "Cash Envelope System",
    description:
      "The cash envelope system is a tangible and straightforward method where you allocate cash into labeled envelopes for specific spending categories, such as groceries, entertainment, or dining out. This method helps you control discretionary spending because you can only spend what&apos;s in each envelope. It provides a visual representation of your budget and prevents overspending in areas where it&apos;s easy to lose track.",
  },
  {
    tool: "Automated Budgeting Apps",
    description:
      "Utilizing automated budgeting apps like Mint, Personal Capital, or YNAB (You Need A Budget) offers convenience by linking to your bank accounts and credit cards to track expenses automatically. These apps categorize your spending in real-time, saving you the effort of manual tracking. They provide insights into your spending patterns and help you stay on top of your financial goals by offering customizable budgeting tools and alerts.",
  },
  {
    tool: "Zero-Based Budgeting",
    description:
      "Zero-based budgeting requires assigning every dollar of your income a specific purpose, ensuring your income minus expenses equals zero. This method encourages proactive financial planning and decision-making by forcing you to allocate all income towards expenses, savings, or debt repayment. It&apos;s effective for prioritizing spending based on personal financial goals and maintaining a disciplined approach to budget management.",
  },
  {
    tool: "Excel or Google Sheets Budget Templates",
    description:
      "Creating your own budget spreadsheet using Excel or Google Sheets allows for complete customization tailored to your financial situation. These templates can be personalized with categories, formulas, and visual representations of data such as graphs and charts. They offer flexibility in budgeting methods and provide a clear overview of your financial health, making it easier to track spending habits and adjust your budget as needed.",
  },
  {
    tool: "Debt Snowball or Avalanche Method",
    description:
      "The debt snowball method involves paying off the smallest debt first and then applying that payment to the next smallest debt once it&apos;s paid off. Conversely, the debt avalanche method prioritizes paying off debts with the highest interest rates first, potentially saving on interest costs over time. Both methods streamline debt repayment efforts within your overall budgeting plan.",
  },
  {
    tool: "Bi-Weekly Budgeting",
    description:
      "Adjusting your budget to align with bi-weekly paychecks if you&apos;re paid on that schedule can simplify your financial planning. This method helps synchronize income with expenses more closely, reducing the risk of overspending or cash flow mismatches. It provides a clearer view of your financial situation on a smaller, more manageable time scale, making it easier to allocate funds for bills, savings, and other financial goals.",
  },
  {
    tool: "Sinking Funds",
    description:
      "Sinking funds involve setting aside money each month for irregular expenses that occur periodically, such as annual insurance premiums or holiday gifts. This practice prevents financial strain from large, irregular expenses by spreading the costs throughout the year. It helps maintain budget stability and avoids the need to dip into emergency savings for non-emergency expenditures.",
  },
];

const BudgetingTool = ({ tool, description }) => {
  const [opened, setOpened] = useState(false);

  return (
    <ListItem>
      <Text>
        <strong>{tool}</strong>
      </Text>
      <Button variant="subtle" onClick={() => setOpened(true)} ml="md">
        Learn More
      </Button>
      <Modal opened={opened} onClose={() => setOpened(false)} title={tool}>
        <Text>{description}</Text>
      </Modal>
    </ListItem>
  );
};

const Unit4Lesson2 = () => {
  return (
    <NavBarTemplate>
      <Center>
        <Breadcrumbs
          prevRoute="/learn/personalFinance/unit4/lesson1"
          nextRoute="/learn/personalFinance/unit4/lesson3"
        />
      </Center>

      <Container>
        <Paper shadow="sm" p="md">
          <Center>
            <Title order={1}>Unit 4.2 - Budgeting</Title>
          </Center>

          <Divider my="sm" />

          <Title order={2}>Creating a Budget</Title>

          <Text>
            Creating a budget is a fundamental step towards effective financial
            management. Begin by calculating your total income from all sources,
            including salaries, bonuses, and any additional earnings. Next,
            identify and categorize your expenses into fixed costs such as rent
            or mortgage payments, utilities, and insurance, as well as variable
            expenses like groceries, entertainment, and dining out. It&apos;s
            crucial to allocate portions of your income towards savings for
            emergencies, retirement, and other financial goals, alongside
            setting aside funds for debt repayment. Regularly track your
            spending to ensure it aligns with your budgeted amounts and make
            adjustments as necessary.
          </Text>

          <Divider my="sm" />

          <Title order={2}>Saving</Title>
          <Text>
            We have not yet talked about one of the most important parts of
            budgeting – saving.
          </Text>
          <Text>
            Saving is the income that remains after current consumption and
            taxes have been accounted for. It often involves making choices
            about delaying immediate desires for future financial security.
            While saving is a personal decision, it&apos;s wise to view it as a
            necessary commitment, akin to paying rent or utilities, albeit to
            secure your own future. Disposable income, which encompasses both
            spending and saving capabilities, plays a crucial role in achieving
            this balance.
          </Text>
          <Text>
            For young adults, a commonly recommended guideline is to save around
            10 percent of their disposable income.
          </Text>

          <Divider my="sm" />

          <Title order={2}>
            Recommended Percentage Allocation Template for Disposable Income
          </Title>
          <List withPadding>
            <ListItem>
              <Text>
                <strong>Essentials:</strong> This category encompasses critical
                expenses that are necessary for day-to-day living and
                maintaining a stable lifestyle. It typically accounts for about
                50% of your disposable income and includes payments such as rent
                or mortgage, utilities (electricity, water, gas), groceries,
                transportation costs (including car payments, gas, and public
                transit fares), and various insurances (health, life, auto).
                These expenses are essential for maintaining your basic needs
                and ensuring a secure living environment.
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <strong>Financial Goals:</strong> Allocating 20% of your
                disposable income towards financial goals is crucial for
                securing your future and building financial stability. This
                category includes savings for an emergency fund to cover
                unexpected expenses and retirement savings to ensure financial
                security in the long term. Additionally, it covers debt
                repayment efforts, including paying off credit cards and loans.
                Prioritizing this category helps you achieve financial
                independence and prepares you for unforeseen financial
                challenges.
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <strong>Lifestyle Choices:</strong> The remaining 30% of your
                disposable income is dedicated to lifestyle choices that enhance
                your quality of life and provide discretionary spending
                flexibility. This category includes expenses related to dining
                out and entertainment, shopping for clothing and electronics,
                indulging in travel or vacation experiences, and pursuing
                hobbies or leisure activities. While these expenditures are
                non-essential, they contribute to your overall well-being and
                satisfaction.
              </Text>
            </ListItem>
          </List>

          <Divider my="sm" />

          <Title order={2}>Budgeting Tools & Techniques</Title>
          <List withPadding>
            {budgetingTools.map((tool, index) => (
              <BudgetingTool
                key={index}
                tool={tool.tool}
                description={tool.description}
              />
            ))}
          </List>
        </Paper>
        <Divider my="sm" />

        <Paper>
          <Title>Build Your Own Budget!</Title>
          <Space h="sm" />
          <Text>
            Take what you learned about budgeting in this lesson and apply it to
            the given budget!
          </Text>
          <Divider my="sm" />

          <Budget />
          <Space h="sm" />
          <Divider my="sm" />
          <Center>
            <Breadcrumbs
              prevRoute="/learn/personalFinance/unit4/lesson1"
              nextRoute="/learn/personalFinance/unit4/lesson3"
            />
          </Center>
        </Paper>
      </Container>
    </NavBarTemplate>
  );
};

export default Unit4Lesson2;
