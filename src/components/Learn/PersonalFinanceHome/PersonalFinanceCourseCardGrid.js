import { Grid, Container, Text } from "@mantine/core";
import { Unit1Card } from "./Unit1Card";
export function PersonalFinanceCardGrid() {
  return (
    <Container my="md">

      <Grid>
        {/* First row: 3 columns */}
        <Grid.Col span={{ base: 12, xs: 12 }}>
            <Unit1Card />
        </Grid.Col>
        <Grid.Col span={{ base: 18, xs: 4 }}>
        </Grid.Col>
        <Grid.Col span={{ base: 18, xs: 4 }}>
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
