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
  Space,
} from "@mantine/core";
import { NavBarTemplate } from "@/components/Navbar/NavBarTemplate";
import MultipleChoiceQuestions from "@/components/Learn/PersonalFinanceHome/Unit3/Lesson2/Lesson2MCQ";
import { Question1 } from "@/components/Learn/PersonalFinanceHome/Unit3/Lesson2/Question1";
import { Question2 } from "@/components/Learn/PersonalFinanceHome/Unit3/Lesson2/Question2";
import { Question3 } from "@/components/Learn/PersonalFinanceHome/Unit3/Lesson2/Question3";
import Breadcrumbs from "@/components/General/Breadcrumbs";
const Unit3Lesson2 = () => {
  return (
    <NavBarTemplate>
      <Center>
        <Breadcrumbs
          prevRoute="/learn/personalFinance/unit3/lesson1"
          nextRoute="/learn/personalFinance/unit4/lesson1"
        />
      </Center>

      <Container>
        <Paper shadow="sm" p="md">
          <Center>
            <Title order={1}>Unit 3.2 - Supply</Title>
          </Center>

          <Divider my="sm" />

          <Title order={2}>Understanding Supply</Title>

          <Text>
            Supply refers to the quantity of a good or service that producers
            are willing and able to offer for sale at various prices during a
            specific period. It&apos;s the counterpart to demand, representing
            the seller&apos;s side of the market.
          </Text>
          <Text>
            The Law of Supply dictates a positive relationship between price and
            quantity supplied. As the price of a good increases, producers are
            generally incentivized to produce and sell more of that good.
            Conversely, when prices decline, producers tend to reduce
            production.
          </Text>
          <Text>
            A supply schedule is a tabular representation of this relationship,
            showcasing the specific quantities producers will offer at different
            price levels.
          </Text>

          <Divider my="sm" />

          <Title order={2}>Factors Influencing Supply</Title>
          <Text>
            Several factors can shift the entire supply curve, altering the
            quantity supplied at every price level. These include:
          </Text>
          <List withPadding>
            <ListItem>
              <Text>
                <strong>Cost of Inputs:</strong> An increase in the price of raw
                materials, labor, or other inputs typically reduces
                profitability, leading to a decrease in supply (shift to the
                left). Conversely, a decrease in input costs can increase supply
                (shift to the right).
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <strong>Technology:</strong> Technological advancements can
                enhance production efficiency, lowering costs and increasing
                supply (shift to the right). Obsolete technology or production
                disruptions can have the opposite effect.
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <strong>Number of Sellers:</strong> An increase in the number of
                producers in a market leads to increased supply (shift to the
                right), while a decrease in the number of sellers reduces supply
                (shift to the left).
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <strong>Government Policies:</strong> Taxes, subsidies,
                regulations, and trade policies can significantly impact supply.
                For instance, a tax on production increases costs, reducing
                supply, while a subsidy decreases costs, increasing supply.
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <strong>Expectations of Future Prices:</strong> If producers
                anticipate higher prices in the future, they might withhold
                current supply to sell at higher prices later, causing a
                decrease in current supply (shift to the left). Conversely,
                expectations of lower future prices might encourage increased
                current supply (shift to the right).
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <strong>Natural Disasters and Other Events:</strong> Events like
                hurricanes, droughts, or labor strikes can disrupt production,
                leading to a decrease in supply (shift to the left).
              </Text>
            </ListItem>
          </List>

          <Divider my="sm" />

          <Title order={2}>Supply and Equilibrium</Title>
          <Text>
            The intersection of supply and demand curves determines the
            equilibrium price and equilibrium quantity. At this point, the
            quantity producers are willing to supply exactly matches the
            quantity consumers are willing to buy.
          </Text>
          <Text>
            A surplus occurs when the quantity supplied exceeds the quantity
            demanded, typically leading to downward pressure on prices.
            Conversely, a shortage arises when the quantity demanded surpasses
            the quantity supplied, often resulting in upward pressure on prices.
          </Text>

          <Divider my="sm" />

          <Title order={2}>Application: Supply and Market Dynamics</Title>
          <List withPadding>
            <ListItem>
              <Text>
                <strong>Example 1: Oil Supply Shock:</strong> A disruption in
                oil production due to a geopolitical event can significantly
                reduce the oil supply. This shift in the supply curve to the
                left leads to a higher equilibrium price and lower equilibrium
                quantity of oil.
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <strong>
                  Example 2: Technological Advancements in Solar Panel
                  Production:
                </strong>{" "}
                Breakthroughs in solar panel technology can lower production
                costs, increasing supply. This shift in the supply curve to the
                right typically results in a lower equilibrium price and higher
                equilibrium quantity of solar panels.
              </Text>
            </ListItem>
          </List>
          <Divider my="sm" />
          <MultipleChoiceQuestions />
          <Divider my="sm" />
          <Space h="md" />
          <Title>Application Questions</Title>
          <Question1 />
          <Question2 />
          <Question3 />
          <Center>
            <Breadcrumbs
              prevRoute="/learn/personalFinance/unit3/lesson1"
              nextRoute="/learn/personalFinance/unit4/lesson1"
            />
          </Center>
        </Paper>
      </Container>
    </NavBarTemplate>
  );
};

export default Unit3Lesson2;
