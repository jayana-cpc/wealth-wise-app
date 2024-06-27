import { Card, Image, Button, Text, Group, RingProgress } from "@mantine/core"
import classes from "./StockValuationCourseCard.module.css"

const stats = [
  { title: "Distance", value: "27.4 km" },
  { title: "Avg. speed", value: "9.6 km/h" },
  { title: "Score", value: "88/100" }
]

export function NewsCard() {
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
          src="https://images.unsplash.com/photo-1486783046960-64d2ef697c46?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Finance"
          height={200}
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
      <Card.Section className={classes.footer}>{items}</Card.Section>
      <Button>Start Here</Button> 
    </Card>
  )
}

