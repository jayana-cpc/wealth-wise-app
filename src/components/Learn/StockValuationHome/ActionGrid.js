import { Card, Text, SimpleGrid, UnstyledButton, Title, Group, useMantineTheme } from "@mantine/core";
import { IconCreditCard, IconBuildingBank, IconRepeat } from "@tabler/icons-react";
import Link from 'next/link';
import classes from "./ActionsGrid.module.css";

const understandingBusiness = [
  { title: "STOCK SELECTION", icon: IconCreditCard, color: "violet", href: "/learn/stockValuation/stockSelect" },
  { title: "OVERVIEW OF THE BUSINESS", icon: IconBuildingBank, color: "indigo", href: "/overview-of-the-business" },
  { title: "KEY PERFORMANCE INDICATORS", icon: IconRepeat, color: "blue", href: "/key-performance-indicators" },
];
const relativeValuation = [
  { title: "INTRODUCTION TO RELATIVE VALUATION", icon: IconCreditCard, color: "violet", href: "/introduction-to-relative-valuation" },
  { title: "ENTERPRISE VALUE MULTIPLES", icon: IconBuildingBank, color: "indigo", href: "/enterprise-value-multiples" },
  { title: "EQUITY VALUE MULTIPLES", icon: IconRepeat, color: "blue", href: "/equity-value-multiples" },
];
const intrinsicValuation = [
  { title: "Credit cards", icon: IconCreditCard, color: "violet", href: "/credit-cards" },
  { title: "Banks nearby", icon: IconBuildingBank, color: "indigo", href: "/banks-nearby" },
  { title: "Transfers", icon: IconRepeat, color: "blue", href: "/transfers" },
];

export function ActionsGrid() {
  const theme = useMantineTheme();

  const understandingBusinessItems = understandingBusiness.map((item) => (
    <Link key={item.title} href={item.href} passHref legacyBehavior>
      <UnstyledButton component="a" className={classes.item}>
        <item.icon color={theme.colors[item.color][6]} size="2rem" />
        <Text size="xs" mt={7}>{item.title}</Text>
      </UnstyledButton>
    </Link>
  ));

  const relativeValuationItems = relativeValuation.map((item) => (
    <Link key={item.title} href={item.href} passHref legacyBehavior>
      <UnstyledButton component="a" className={classes.item}>
        <item.icon color={theme.colors[item.color][6]} size="2rem" />
        <Text size="xs" mt={7}>{item.title}</Text>
      </UnstyledButton>
    </Link>
  ));

  const intrinsicValuationItems = intrinsicValuation.map((item) => (
    <Link key={item.title} href={item.href} passHref legacyBehavior>
      <UnstyledButton component="a" className={classes.item}>
        <item.icon color={theme.colors[item.color][6]} size="2rem" />
        <Text size="xs" mt={7}>{item.title}</Text>
      </UnstyledButton>
    </Link>
  ));

  return (
    <>
      <Text fz="h1" className={classes.titleBig}>
        Stock Valuation Lessons
      </Text>
      <Card withBorder radius="md" className={classes.card}>
        <Group justify="space-between">
          <Text className={classes.title}>Understanding the Business</Text>
        </Group>
        <SimpleGrid cols={3} mt="md">
          {understandingBusinessItems}
        </SimpleGrid>
      </Card>
      <Card withBorder radius="md" className={classes.card}>
        <Group justify="space-between">
          <Text className={classes.title}>Relative Valuation</Text>
        </Group>
        <SimpleGrid cols={3} mt="md">
          {relativeValuationItems}
        </SimpleGrid>
      </Card>
      <Card withBorder radius="md" className={classes.card}>
        <Group justify="space-between">
          <Text className={classes.title}>Intrinsic Valuation</Text>
        </Group>
        <SimpleGrid cols={3} mt="md">
          {intrinsicValuationItems}
        </SimpleGrid>
      </Card>
    </>
  );
}