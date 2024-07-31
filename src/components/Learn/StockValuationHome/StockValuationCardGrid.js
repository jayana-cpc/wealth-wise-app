import { Grid, Container, Text } from "@mantine/core";
import { PickStockCard } from "./PickStockCard";
import classes from "./StockValuationCardGrid.module.css";

export function StockValuationCardGrid() {
  return (
    <Container my="md">
      <Grid>
        {/* First row: 3 columns */}
        <Grid.Col span={{ base: 12, xs: 12 }}>
          <Text fz="h1" className={classes.title}>
            Stock Valuation Lessons
          </Text>
        </Grid.Col>
        <Grid.Col span={{ base: 18, xs: 4 }}>
          <PickStockCard />
        </Grid.Col>
        <Grid.Col span={{ base: 18, xs: 4 }}>
          <PickStockCard />
        </Grid.Col>
        <Grid.Col span={{ base: 18, xs: 4 }}>
          <PickStockCard />
        </Grid.Col>
        <Grid.Col span={{ base: 18, xs: 4 }}>
          <PickStockCard />
        </Grid.Col>
        <Grid.Col span={{ base: 18, xs: 4 }}>
          <PickStockCard />
        </Grid.Col>
        <Grid.Col span={{ base: 18, xs: 4 }}>
          <PickStockCard />
        </Grid.Col>
      </Grid>
    </Container>
  );
}
