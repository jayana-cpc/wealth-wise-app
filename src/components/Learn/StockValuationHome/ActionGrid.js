import {
  Card,
  Text,
  SimpleGrid,
  Image,
  AspectRatio,
  Container,
  Grid,
  Stepper,
  Center,
  rem,
} from "@mantine/core";
import {
  IconCircleCheck,
} from '@tabler/icons-react';
import { useRouter } from "next/navigation";
import { useState } from "react";

import classes from "./ActionsGrid.module.css";

const mockdata = [
  {
    title: "Stock Selection",
    image: "/stockselection.png",
  },
  {
    title: "Overview of Business",
    image: "/businessoutput.png",
  },
  {
    title: "Intro to Relative Valuation",
    image: "/keyperformanceindicators.png",
  },
  {
    title: "Enterprise Value Multiples",
    image: "/valuation.png",
  },
  {
    title: "Equity Value Multiples",
    image: "/weighing-scale.png",
  },
  {
    title: "Discounted Cashflow Valuation",
    image: "/investor.png",
  },
];

export function ActionsGrid() {
  const router = useRouter();
  const [hoveredStep, setHoveredStep] = useState(-1);

  const navigateToStep = (step) => {
    switch (step) {
      case 1:
        router.push("/learn/stockValuation/understandingBusiness");
        break;
      case 2:
        router.push("/learn/stockValuation/relativeValuationIntro");
        break;
      case 3:
        router.push("/learn/stockValuation/enterpriseValueMultiples");
        break;
      case 4:
        router.push("/learn/stockValuation/equityValueMultiples");
        break;
      case 5:
        router.push("/learn/stockValuation/discountedCashflowValuation");
        break;
      default:
        router.push("/learn/stockValuation/stockSelect");
    }
  };

  const handleMouseEnter = (step) => {
    setHoveredStep(step);
  };

  const handleMouseLeave = () => {
    setHoveredStep(-1);
  };
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
      <Center>
        <Text className={classes.title} mt="sm">
          {article.title}
        </Text>
      </Center>
      

    </Card>
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
              <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="sm">
                {cards}
              </SimpleGrid>
            </Container>
          </Grid.Col>
          <Grid.Col span={{ base: 12, xs: 3 }} style={{marginTop: "88px", minHeight: "400px"}}>
              
                <Stepper
                  orientation="vertical"
                  iconSize={50}
                  active={hoveredStep}
                  onStepClick={navigateToStep}
                  spacing="xl"
                  completedIcon={<IconCircleCheck style={{ width: rem(18), height: rem(18) }} />}
                >
                  <Stepper.Step
                    label="Stock Selection"
                    description="Choose the first company you want to analyze."
                    onMouseEnter={() => handleMouseEnter(0)}
                    onMouseLeave={handleMouseLeave}
                  ></Stepper.Step>
                  <Stepper.Step
                    label="Understand the Business"
                    description="Understand how the company functions."
                    onMouseEnter={() => handleMouseEnter(1)}
                    onMouseLeave={handleMouseLeave}
                  ></Stepper.Step>
                  <Stepper.Step
                    label="Intro to Relative Valuation"
                    description="Understand the basis for relative valuation"
                    onMouseEnter={() => handleMouseEnter(2)}
                    onMouseLeave={handleMouseLeave}
                  ></Stepper.Step>
                  <Stepper.Step
                    label="Enterprise Value Multiples"
                    description="Compare company using enterprise multiples."
                    onMouseEnter={() => handleMouseEnter(3)}
                    onMouseLeave={handleMouseLeave}
                  ></Stepper.Step>
                  <Stepper.Step
                    label="Equity Value Multiples"
                    description="Compare company  using equity multiples."
                    onMouseEnter={() => handleMouseEnter(4)}
                    onMouseLeave={handleMouseLeave}
                  ></Stepper.Step>
                  <Stepper.Step
                    label="Discounted Cashflow Valuation"
                    description="Perform intrinsic valuation using a DCF Model."
                    onMouseEnter={() => handleMouseEnter(5)}
                    onMouseLeave={handleMouseLeave}
                  ></Stepper.Step>
                </Stepper>
              {/* Another SimpleGrid with a distinct background color */}
             
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
}
