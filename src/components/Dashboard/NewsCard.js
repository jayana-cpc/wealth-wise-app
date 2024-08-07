import { Card, Image, Button, Text, Group } from "@mantine/core";
import classes from "./StockValuationCourseCard.module.css";
import { useRouter } from "next/navigation";

export function NewsCard() {
  const router = useRouter();
  const handleButtonClick = () => {
    router.push("/news");
  };
  return (
    <Card withBorder padding="lg" className={classes.card}>
      <Card.Section>
        <Image
          src="https://images.unsplash.com/photo-1486783046960-64d2ef697c46?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Finance"
          height={200}
          className={classes.image}
        />
      </Card.Section>

      <Group justify="space-between" mt="xl">
        <Text fz="h4" fw={700} className={classes.title}>
          News Feed
        </Text>
      </Group>
      <Text mt="sm" mb="md" c="dimmed" fz="xs">
        Stay updated on market news to fuel your smart trading decisions.
      </Text>
      <Button onClick={handleButtonClick}>Start Here</Button>
    </Card>
  );
}
