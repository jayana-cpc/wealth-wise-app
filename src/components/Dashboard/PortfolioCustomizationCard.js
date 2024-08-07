import { Card, Image, Button, Text, Group } from "@mantine/core";
import classes from "./StockValuationCourseCard.module.css";
import { useRouter } from "next/navigation";

export function PortfolioCustomizationCard() {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/portfolioAdvisor/portfolioCustomization");
  };

  return (
    <Card withBorder padding="lg" className={classes.card}>
      <Card.Section>
        <Image
          src="https://images.unsplash.com/photo-1621264448270-9ef00e88a935?q=80&w=1557&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Finance"
          height={200}
          className={classes.image}
        />
      </Card.Section>

      <Group justify="space-between" mt="xl">
        <Text fz="h4" fw={700} className={classes.title}>
          Portfolio Customization
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
