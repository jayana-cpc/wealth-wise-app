import { Card, Image, Button, Text, Group } from "@mantine/core";
import classes from "./StockValuationCourseCard.module.css";
import { useRouter } from "next/navigation";

export function PortfolioAdvisorCard() {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/portfolioAdvisor/portfolioAnalysis");
  };

  return (
    <Card withBorder padding="lg" className={classes.card}>
      <Card.Section>
        <Image
          src="https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Finance"
          height={200}
          className={classes.image}
        />
      </Card.Section>

      <Group justify="space-between" mt="xl">
        <Text fz="h4" fw={700} className={classes.title}>
          Wealth Wise Portfolio Advisor
        </Text>
      </Group>

      <Text mt="sm" mb="md" c="dimmed" fz="xs">
        Wondering which companies fit your financial situation and personal
        values? Let Wealth Wise AI Guide you!
      </Text>

      <Button onClick={handleButtonClick}>Start Here</Button>
    </Card>
  );
}
