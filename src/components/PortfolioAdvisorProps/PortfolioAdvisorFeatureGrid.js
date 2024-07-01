import { Grid, Container, Text } from "@mantine/core";
import { PortfolioAdvisorCard } from "../Dashboard/PortfolioAdvisorCard";
import { PortfolioCustomizationCard } from "../Dashboard/PortfolioCustomizationCard";
import classes from "./PortfolioAdvisorFeatureGrid.module.css"

export function PortfolioAdvisorFeatureGrid() {
  return (
    <Container my="md">

      <Grid>
        {/* First row: 3 columns */}
        <Grid.Col span={{ base: 12, xs: 12 }}>
          <Text fz="h1" className={classes.title}>
            Wealth Wise Portfolio Advisor
          </Text>
        </Grid.Col>
        <Grid.Col span={{ base: 18, xs: 6 }}>
          <PortfolioAdvisorCard />
        </Grid.Col>
        <Grid.Col span={{ base: 18, xs: 6 }}>
          <PortfolioCustomizationCard />
        </Grid.Col>

      </Grid>
    </Container>
  );
}
