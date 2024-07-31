import { Grid, Container } from "@mantine/core";
import { Unit1Card } from "./Unit1/Unit1Card";
import { Unit2Card } from "./Unit2/Unit2Card";
import { Unit3Card } from "./Unit3/Unit3Card";
import { Unit4Card } from "./Unit4/Unit4Card";
import { Unit5Card } from "./Unit5/Unit5Card";
import { Unit6Card } from "./Unit6/Unit6Card";
import { Unit7Card } from "./Unit7/Unit7Card";
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
        <Grid.Col span={{ base: 18, xs: 6 }}>
          <Unit3Card />
        </Grid.Col>
        <Grid.Col span={{ base: 18, xs: 6 }}>
          <Unit4Card />
        </Grid.Col>
        <Grid.Col span={{ base: 18, xs: 6 }}>
          <Unit5Card />
        </Grid.Col>
        <Grid.Col span={{ base: 18, xs: 6 }}>
          <Unit6Card />
        </Grid.Col>
        <Grid.Col span={{ base: 18, xs: 6 }}>
          <Unit7Card />
        </Grid.Col>
      </Grid>
    </Container>
  );
}
