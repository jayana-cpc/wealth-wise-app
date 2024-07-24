import { Grid, Container, Text } from "@mantine/core";
import { Unit1Card } from "./Unit1/Unit1Card";
import { Unit2Card } from "./Unit2/Unit2Card";
export function PersonalFinanceCardGrid() {
  return (
    <Container my="md">

      <Grid>

        <Grid.Col span={{ base: 18, xs: 6 }}>
          <Unit1Card />
        </Grid.Col>
        <Grid.Col span={{ base: 18, xs: 6 }}>
          <Unit2Card />
        </Grid.Col>
        <Grid.Col span={{ base: 18, xs: 4 }}>
        </Grid.Col>
        <Grid.Col span={{ base: 18, xs: 4 }}>
        </Grid.Col>
        <Grid.Col span={{ base: 18, xs: 4 }}>
        </Grid.Col>
        <Grid.Col span={{ base: 18, xs: 4 }}>
        </Grid.Col>

      </Grid>
    </Container>
  );
}
