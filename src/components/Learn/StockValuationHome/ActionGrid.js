import {
  Card,
  Text,
  SimpleGrid,
  UnstyledButton,
  Title,
  Image,
  AspectRatio,
  Group,
  useMantineTheme,
  Container,
  Grid,
  Stack,
  Overlay,
} from "@mantine/core";

import {
  IconCreditCard,
  IconBuildingBank,
  IconRepeat,
} from "@tabler/icons-react";
import Link from "next/link";
import classes from "./ActionsGrid.module.css";

const understandingBusiness = [
  {
    title: "STOCK SELECTION",
    icon: IconCreditCard,
    color: "violet",
    href: "/learn/stockValuation/stockSelect",
  },
  {
    title: "OVERVIEW OF THE BUSINESS",
    icon: IconBuildingBank,
    color: "indigo",
    href: "/overview-of-the-business",
  },
  {
    title: "KEY PERFORMANCE INDICATORS",
    icon: IconRepeat,
    color: "blue",
    href: "/key-performance-indicators",
  },
];
const relativeValuation = [
  {
    title: "INTRODUCTION TO RELATIVE VALUATION",
    icon: IconCreditCard,
    color: "violet",
    href: "/introduction-to-relative-valuation",
  },
  {
    title: "ENTERPRISE VALUE MULTIPLES",
    icon: IconBuildingBank,
    color: "indigo",
    href: "/enterprise-value-multiples",
  },
  {
    title: "EQUITY VALUE MULTIPLES",
    icon: IconRepeat,
    color: "blue",
    href: "/equity-value-multiples",
  },
];
const intrinsicValuation = [
  {
    title: "Credit cards",
    icon: IconCreditCard,
    color: "violet",
    href: "/credit-cards",
  },
  {
    title: "Banks nearby",
    icon: IconBuildingBank,
    color: "indigo",
    href: "/banks-nearby",
  },
  { title: "Transfers", icon: IconRepeat, color: "blue", href: "/transfers" },
];

const mockdata = [
  {
    title: "Stock Selection",
    image: "/stockselection.png",
    course: "Understanding the Business",
  },
  {
    title: "Overview of Business",
    image: "/businessoutput.png",
    course: "Understanding the Business",
  },
  {
    title: "Key Performance Indicators",
    image: "/keyperformanceindicators.png",
    course: "Understanding the Business",
  },
  {
    title: "Intro to Relative Valuation",
    image: "/valuation.png",
    course: "Relative Valuation",
  },
  {
    title: "Enterprise Value Multiples",
    image: "/weighing-scale.png",
    course: "Relative Valuation",
  },
  {
    title: "Equity Value Multiples",
    image: "/investor.png",
    course: "Relative Valuation",
  },
  {
    title: "About Credit Cards",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
    course: "Intrinsic Valuation",
  },
  {
    title: "Banks Nearby",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
    course: "Intrinsic Valuation",
  },
  {
    title: "Transfer Information",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
    course: "Intrinsic Valuation",
  },
];

export function ActionsGrid() {
  const theme = useMantineTheme();

  const cards = mockdata.map((article) => (
    <Card
      key={article.title}
      p="md"
      radius="md"
      component="a"
      href="#"
      className={classes.card}
    >
      <AspectRatio ratio={1920 / 1080}>
        <Image
          src={article.image}
          className={classes.cardImg}
          alt={article.title}
        />
      </AspectRatio>
      <Text className={classes.title} mt="sm">
        {article.title}
      </Text>
      <Text c="dimmed" size="xs" fw={500} mt={1}>
        Course:{" "}
        <Text component="span" fw={650} style={{ color: "#A9A9A9" }}>
          {article.course}
        </Text>
      </Text>
    </Card>
  ));

  const understandingBusinessItems = understandingBusiness.map((item) => (
    <Link key={item.title} href={item.href} passHref legacyBehavior>
      <UnstyledButton component="a" className={classes.item}>
        <item.icon color={theme.colors[item.color][6]} size="2rem" />
        <Text size="xs" mt={7}>
          {item.title}
        </Text>
      </UnstyledButton>
    </Link>
  ));

  const relativeValuationItems = relativeValuation.map((item) => (
    <Link key={item.title} href={item.href} passHref legacyBehavior>
      <UnstyledButton component="a" className={classes.item}>
        <item.icon color={theme.colors[item.color][6]} size="2rem" />
        <Text size="xs" mt={7}>
          {item.title}
        </Text>
      </UnstyledButton>
    </Link>
  ));

  const intrinsicValuationItems = intrinsicValuation.map((item) => (
    <Link key={item.title} href={item.href} passHref legacyBehavior>
      <UnstyledButton component="a" className={classes.item}>
        <item.icon color={theme.colors[item.color][6]} size="2rem" />
        <Text size="xs" mt={7}>
          {item.title}
        </Text>
      </UnstyledButton>
    </Link>
  ));

  return (
    <>
      <Container fluid style={{ marginTop: "3rem", marginLeft: "3rem" }}>
        <Grid gutter="xl">
          <Grid.Col
            span={{ base: 12, xs: 8 }}
            className={classes.containerBg}
            style={{ marginRight: "4.5rem" }}
          >
            <Container fluid my="md">
              <Title size="30px" my="xl" mx="md">
                Stock Valuation Lessons
              </Title>
              <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="sm">
                {cards}
              </SimpleGrid>
            </Container>
          </Grid.Col>
          <Grid.Col span={{ base: 12, xs: 3 }}>
            <Stack spacing="lg">
              {" "}
              {/* Stack the grids vertically */}
              <SimpleGrid
                cols={{ base: 1, sm: 1 }}
                spacing="lg"
                style={{
                  backgroundColor: "rgb(26, 25, 25)",
                  marginTop: "-1rem",
                  marginRight: "-1rem",
                  marginLeft: "-1rem",
                  paddingBottom: "3rem",
                  borderRadius: "20px",
                }} // Distinct background color
              >
                <Title size="22px" my="xl" mx="xl">
                  Additional Info
                </Title>
                <Stack spacing="xl">
                  <Card
                    radius="md"
                    className={classes.card1}
                    style={{
                      marginLeft: "1.5rem",
                      marginRight: "1.5rem",
                      marginBottom: "1rem",
                      marginTop: "-1.5rem",
                    }}
                  >
                    <Overlay
                      className={classes.overlay1}
                      opacity={0.55}
                      zIndex={0}
                    />
                    <div className={classes.content}>
                      <Text size="lg" fw={700} className={classes.title1}>
                        Plan & save
                      </Text>
                      <Text size="sm" className={classes.description1}>
                        Save up to 25% at Fifth Season Hotels in Europe, the
                        Middle East, Africa, and Asia Pacific
                      </Text>
                    </div>
                  </Card>
                  <Card
                    radius="md"
                    className={classes.card1}
                    style={{ marginLeft: "1.5rem", marginRight: "1.5rem" }}
                  >
                    <Overlay
                      className={classes.overlay1}
                      opacity={0.55}
                      zIndex={0}
                    />
                    <div className={classes.content}>
                      <Text size="lg" fw={700} className={classes.title1}>
                        Plan & save
                      </Text>
                      <Text size="sm" className={classes.description1}>
                        Save up to 25% at Fifth Season Hotels in Europe, the
                        Middle East, Africa, and Asia Pacific
                      </Text>
                    </div>
                  </Card>
                </Stack>
              </SimpleGrid>
              {/* Another SimpleGrid with a distinct background color */}
              <SimpleGrid
                cols={{ base: 1, sm: 1 }}
                spacing="lg"
                style={{
                  backgroundColor: "rgb(26, 25, 25)",
                  marginTop: "1rem",
                  marginRight: "-1rem",
                  marginLeft: "-1rem",
                  paddingBottom: "3rem",
                  borderRadius: "20px",
                }}
              >
                <Title size="22px" my="xl" mx="xl">
                  External Links
                </Title>

                <Card
                  radius="md"
                  className={classes.card1}
                  style={{
                    marginLeft: "1rem",
                    marginRight: "1rem",
                    marginTop: "-1.5rem",
                  }}
                >
                  <Overlay
                    className={classes.overlay1}
                    opacity={0.55}
                    zIndex={0}
                  />
                  <div className={classes.content}>
                    <Text size="lg" fw={700} className={classes.title1}>
                      Plan & save
                    </Text>
                    <Text size="sm" className={classes.description1}>
                      Save up to 25% at Fifth Season Hotels in Europe, the
                      Middle East, Africa, and Asia Pacific
                    </Text>
                  </div>
                </Card>
              </SimpleGrid>
            </Stack>
          </Grid.Col>
        </Grid>
      </Container>
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
