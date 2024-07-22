import { Grid, Skeleton, Container, Text } from "@mantine/core";
import { StockValuationCourseCard } from "../Dashboard/StockValuationCourseCard";
import { PersonalFinanceCourseCard } from "../Dashboard/PersonalFinanceCourseCard";
import classes from "./LearnFeatureCardsGrid.module.css"

export function LearnFeatureCardsGrid() {
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

      </Grid>
    </Container>
  );
}
