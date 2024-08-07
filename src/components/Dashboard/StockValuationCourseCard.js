import { Card, Image, Button, Text, Group } from "@mantine/core";
import classes from "./StockValuationCourseCard.module.css";
import { useRouter } from "next/navigation";

export function StockValuationCourseCard() {
  const router = useRouter();
  const handleButtonClick = () => {
    router.push("/learn/stockValuation");
  };
  return (
    <Card withBorder padding="lg" className={classes.card}>
      <Card.Section>
        <Image
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Finance"
          height={200}
          className={classes.image}
        />
      </Card.Section>

      <Group justify="space-between" mt="xl">
        <Text fz="h4" fw={700} className={classes.title}>
          Stock Valuation Course
        </Text>
        {/* <Group gap={5}>
          <Text fz="xs" c="dimmed">
            80% completed
          </Text>
          <RingProgress
            size={18}
            thickness={2}
            sections={[{ value: 80, color: "blue" }]}
          />
        </Group> */}
      </Group>
      <Text mt="sm" mb="md" c="dimmed" fz="xs">
        Learn how to pick the first company in your stock portfolio with
        interactive lessons.
      </Text>
      <Button onClick={handleButtonClick}>Start Here</Button>
    </Card>
  );
}