import { Grid, Skeleton, Container, Text } from "@mantine/core";
import { StockValuationCourseCard } from "./StockValuationCourseCard";
import { PersonalFinanceCourseCard } from "./PersonalFinanceCourseCard";
import { StockSurveyCard } from "./StockSurveyCard";
import { PortfolioCustomizationCard } from "./PortfolioCustomizationCard";
import { NewsCard } from "./NewsCard";
import { PortfolioAdvisorCard } from "./PortfolioAdvisorCard";
import classes from "./FeatureCardsGrid.module.css"

export function FeatureCardsGrid() {
  return (
    <Container my="md">

      <Grid>
        {/* First row: 3 columns */}
        <Grid.Col span={{ base: 12, xs: 12 }}>
          <Text fz="h1" className={classes.title}>
            Learn Courses
          </Text>
        </Grid.Col>
        <Grid.Col span={{ base: 18, xs: 6 }}>
          <StockValuationCourseCard />
        </Grid.Col>
        <Grid.Col span={{ base: 18, xs: 6 }}>
          <PersonalFinanceCourseCard />
        </Grid.Col>

        <Grid.Col span={{ base: 18, xs: 6 }}>
          <StockSurveyCard />
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 6 }}>
          <NewsCard />
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 12 }}>
          <Text fz="h1" className={classes.title}>
            Wealth Wise Portfolio Customization
          </Text>
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 6 }}>
          <PortfolioCustomizationCard />
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 6 }}>
          <PortfolioAdvisorCard />
        </Grid.Col>

      </Grid>
    </Container>
  );
}
