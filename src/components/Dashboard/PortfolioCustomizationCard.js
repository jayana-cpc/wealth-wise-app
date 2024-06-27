import { Card, Image, Button, Text, Group, RingProgress } from "@mantine/core"
import classes from "./StockValuationCourseCard.module.css"

const stats = [
  { title: "Distance", value: "27.4 km" },
  { title: "Avg. speed", value: "9.6 km/h" },
  { title: "Score", value: "88/100" }
]

export function PortfolioCustomizationCard() {
  const items = stats.map(stat => (
    <div key={stat.title}>
      <Text size="xs" color="dimmed">
        {stat.title}
      </Text>
      <Text fw={500} size="sm">
        {stat.value}
      </Text>
    </div>
  ))

  return (
    <Card withBorder padding="lg" className={classes.card}>
      
      <Card.Section>
        <Image
          src="https://images.unsplash.com/photo-1621264448270-9ef00e88a935?q=80&w=1557&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Finance"
          height={200}
        />
      </Card.Section>

      <Group justify="space-between" mt="xl">
        <Text fz="h4" fw={700} className={classes.title}>
            Portfolio Customization
        </Text>

      </Group>
      <Text mt="sm" mb="md" c="dimmed" fz="xs">
        Wondering which companies fit your financial situation and personal values? Let Wealth Wise AI Guide you!
      </Text>
      <Card.Section className={classes.footer}>{items}</Card.Section>
      <Button>Start Here</Button> 
    </Card>
  )
}

