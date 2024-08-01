"use client";
import React, { useState } from "react";
import {
  Container,
  Title,
  Text,
  Divider,
  Paper,
  Center,
  Space,
  Button,
  Modal,
  List,
  ListItem,
} from "@mantine/core";
import { NavBarTemplate } from "@/components/Navbar/NavBarTemplate";
import { MultipleChoiceQuestions } from "@/components/Learn/PersonalFinanceHome/Unit5/Lesson2/MultipleChoiceQuiz";
import Breadcrumbs from "@/components/General/Breadcrumbs";
const consumerProtections = [
  {
    title: "The Truth in Lending Act (TILA)",
    description:
      "This law ensures you receive clear information about the cost of credit, including finance charges and APRs. For instance, when you apply for a credit card, TILA requires creditors to disclose the terms of the loan. If your card is lost or stolen, TILA protects you by limiting your liability to $50 for unauthorized transactions.",
  },
  {
    title: "The Fair Credit and Charge Card Disclosure Act",
    description:
      "This act mandates that credit card applications include a disclosure box summarizing key features and costs. For example, if you’re considering a new credit card, this box helps you quickly understand important details like interest rates and fees.",
  },
  {
    title: "The Credit Card Act of 2009",
    description:
      "This significant piece of legislation introduced new rules to prevent unfair practices. It requires clear disclosure of terms, limits on fees and rate increases, and consistency in payment dates. The Act also mandates that consumers under 21 must demonstrate their ability to make payments or have a co-signer to open an account.",
  },
  {
    title: "The Fair Credit Billing Act",
    description:
      "This law requires timely credit for payments and allows you to dispute billing errors. If you receive a faulty product and report it, you can withhold payment until the issue is resolved.",
  },
  {
    title: "Over-the-Credit-Limit Fees",
    description:
      "Recent regulations state that you must opt-in if you want your card issuer to allow transactions that exceed your credit limit. Without this opt-in, any over-the-limit purchases will be declined.",
  },
];

const ConsumerProtection = ({ title, description }) => {
  const [opened, setOpened] = useState(false);

  return (
    <ListItem>
      <Text>
        <strong>{title}</strong>
      </Text>
      <Button variant="subtle" onClick={() => setOpened(true)} ml="md">
        Learn More
      </Button>
      <Modal opened={opened} onClose={() => setOpened(false)} title={title}>
        <Text>{description}</Text>
      </Modal>
    </ListItem>
  );
};

const Unit5Lesson2 = () => {
  return (
    <NavBarTemplate>
      <Center>
        <Breadcrumbs
          prevRoute="/learn/personalFinance/unit5/lesson1"
          nextRoute="/learn/personalFinance/unit6"
        />
      </Center>

      <Container>
        <Paper shadow="sm" p="md">
          <Center>
            <Title order={1}>Unit 5.2 - A Closer Look At Credit Cards</Title>
          </Center>

          <Divider my="sm" />

          <Title order={2}>Introduction to Credit Cards</Title>
          <Text>
            In the world of personal finance, credit cards are a powerful tool
            that can either work for you or against you. Picture yourself in a
            bustling store, eyeing a sleek new gadget or a stylish outfit.
            Instead of waiting to save up the full amount, you pull out your
            credit card and make the purchase. This convenience is one of the
            primary appeals of credit cards. They allow you to obtain goods or
            services immediately and pay for them later, under the trust that
            you&apos;ll settle the balance in the future, typically with
            interest.
          </Text>
          <Text>
            For example, you may buy a new laptop using your credit card and
            enjoy the immediate benefit of having the latest technology without
            having to wait months to save up. However, it’s important to
            understand the credit card agreement you sign, which outlines your
            responsibilities and the terms of use. This agreement includes
            details about interest rates, fees, and your obligations as a
            cardholder.
          </Text>

          <Divider my="sm" />

          <Title order={2}>Obtaining a Visa or MasterCard</Title>
          <Text>
            Acquiring a Visa or MasterCard is a common step in managing personal
            finances, and it&apos;s crucial to understand the process. Let’s
            break it down:
          </Text>
          <Text>
            <strong>Eligibility and Application Process:</strong>
          </Text>
          <List withPadding>
            <ListItem>
              <Text>
                <strong>Credit Score:</strong> To obtain a Visa or MasterCard,
                you generally need a good credit score. Lenders use your credit
                history to determine your eligibility. Those who have a solid
                credit history tend to be more easily approved for credit cards
                than those who have a poor credit history, as they often face
                higher interest rates or less favorable terms.
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <strong>Application:</strong> You can apply for a Visa or
                MasterCard online, through a bank, or via credit card
                issuers&apos; websites. The application typically requires
                personal information, including your income, employment details,
                and existing debt.
              </Text>
            </ListItem>
          </List>
          <Text>
            <strong>Types of Credit Cards:</strong>
          </Text>
          <List withPadding>
            <ListItem>
              <Text>
                <strong>Standard Visa/MasterCard:</strong> Basic credit cards
                offer standard benefits and are widely accepted.
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <strong>Rewards Credit Cards:</strong> These cards offer
                cashback or points for every dollar spent. Using Visa rewards
                cards may allow you to earn points on travel expenses, which you
                can redeem for items like an airline ticket.
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <strong>Secured Credit Cards:</strong> Designed for those with
                limited or poor credit histories, secured cards require a
                security deposit.
              </Text>
            </ListItem>
          </List>
          <Text>
            <strong>Approval and Activation:</strong>
          </Text>
          <List withPadding>
            <ListItem>
              <Text>
                <strong>Approval:</strong> Once your application is approved,
                you&apos;ll receive your card in the mail. The approval process
                might vary based on the card issuer’s criteria and your credit
                profile.
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <strong>Activation:</strong> To start using your card, you need
                to activate it by following the instructions provided, usually
                via phone or online.
              </Text>
            </ListItem>
          </List>

          <Divider my="sm" />

          <Title order={2}>Using Credit Cards Responsibly</Title>
          <Text>
            Managing a credit card wisely is essential for maintaining financial
            health. Imagine you’ve just purchased a beautiful jacket on sale.
            With a credit card, you might be tempted to buy it immediately, but
            it&apos;s important to consider your budget. Paying only the minimum
            due might seem manageable, but it can lead to high-interest costs
            over time. Instead, aim to pay off your balance in full each month
            to avoid interest charges and maintain financial stability.
          </Text>
          <Text>
            Unexpected expenses can also arise, like when you’re traveling and
            your phone suddenly breaks. Without immediate cash, using your
            credit card to cover the repair can save your trip from turning into
            a crisis.
          </Text>

          <Divider my="sm" />

          <Title order={2}>Credit Card Benefits and Rewards</Title>
          <Text>
            Credit cards often come with enticing benefits and rewards. For
            instance, if you have a cashback card, you might earn 1.5% cash back
            on all purchases. Imagine earning $150 back on $10,000 spent over a
            year. Similarly, travel rewards cards can accumulate points for
            every dollar spent, which can be redeemed for flights or hotel
            stays. If you’ve been using a travel rewards card for a year, you
            might end up with enough points for a free vacation.
          </Text>
          <Text>
            Additional perks such as purchase protection and extended warranties
            can be incredibly useful. For example, if you buy a new television
            and it malfunctions after a few months, your credit card’s extended
            warranty might cover the repair, saving you from out-of-pocket
            expenses.
          </Text>

          <Divider my="sm" />

          <Title order={2}>Applying for and Managing Credit Cards</Title>
          <Text>
            Choosing the right credit card involves evaluating various factors.
            Suppose you’re deciding between a credit card with a low APR but a
            high annual fee and one with a higher APR but no annual fee. If you
            often carry a balance, the lower APR card might be more economical
            in the long run.
          </Text>
          <Text>
            Once you have a credit card, using it wisely is crucial. Building
            good credit requires responsible behavior, such as making timely
            payments and keeping your credit utilization low. For instance, if
            you have a $5,000 limit and consistently use only $1,000, you
            demonstrate good credit management, which positively impacts your
            credit score.
          </Text>

          <Divider my="sm" />

          <Title order={2}>Consumer Protections</Title>
          <List withPadding>
            {consumerProtections.map((protection, index) => (
              <ConsumerProtection
                key={index}
                title={protection.title}
                description={protection.description}
              />
            ))}
          </List>

          <Divider my="sm" />

          <Title order={2}>Understanding Your Credit Score</Title>
          <Text>
            To begin, it&apos;s important to understand what constitutes your
            credit score. Your credit score, ranging from 300 to 850, is a
            numerical representation of your creditworthiness. It is influenced
            by factors including your payment history, credit utilization,
            length of credit history, types of credit accounts, and recent
            credit inquiries. Start by obtaining your credit report from a major
            credit bureau—Experian, Equifax, or TransUnion—to assess your
            current score and identify areas for improvement.
          </Text>

          <Divider my="sm" />

          <Title order={2}>Building a Positive Credit History</Title>
          <Text>
            Building a strong credit history is crucial for improving your
            credit score. Focus on making timely payments for all your bills and
            existing credit accounts, as payment history significantly impacts
            your score. Maintain a credit utilization ratio below 30% by using
            only a portion of your available credit limit. Additionally, work on
            establishing a lengthy credit history by keeping older accounts
            active and in good standing. Diversify your credit types, such as
            combining credit cards with installment loans, to positively
            influence your score. Responsible credit management is key to
            achieving a favorable credit profile.
          </Text>

          <Divider my="sm" />

          <Title order={2}>Obtaining Your First Credit Card</Title>
          <Text>
            Once you have a grasp of credit basics and have begun to build a
            positive credit history, you can apply for your first credit card.
            Start by researching credit card options, focusing on cards designed
            for beginners or secured credit cards that require a deposit. Check
            the eligibility requirements for each card to ensure you meet them.
            Apply for a card that aligns with your credit profile, either online
            or in person. After approval, use the card responsibly for small
            purchases and aim to pay off the balance in full each month to avoid
            interest and build a positive credit history.
          </Text>

          <Space h="md" />
          <Divider my="sm" />
          <MultipleChoiceQuestions />
          <Space h="md" />
          <Divider my="sm" />
          <Center>
            <Breadcrumbs
              prevRoute="/learn/personalFinance/unit5/lesson1"
              nextRoute="/learn/personalFinance/unit6"
            />
          </Center>
        </Paper>
      </Container>
    </NavBarTemplate>
  );
};

export default Unit5Lesson2;
