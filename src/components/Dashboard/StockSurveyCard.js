import { Card, Image, Button, Text, Group, RingProgress } from "@mantine/core"
import classes from "./StockValuationCourseCard.module.css"
import { useRouter } from 'next/navigation';

const stats = [
  { title: "Distance", value: "27.4 km" },
  { title: "Avg. speed", value: "9.6 km/h" },
  { title: "Score", value: "88/100" }
]

export function StockSurveyCard() {
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
  const router = useRouter();
  const handleButtonClick = () => {
      router.push('/recommendationSurvey');
    };
  return (
    <Card withBorder padding="lg" className={classes.card}>
      
      <Card.Section>
        <Image
          src="https://images.unsplash.com/photo-1553316045-e56f8b09f0ed?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmluYW5jZSUyMGJ1bGx8ZW58MHx8MHx8fDA%3D"
          alt="Finance"
          height={200}
        />
      </Card.Section>

      <Group justify="space-between" mt="xl">
        <Text fz="h4" fw={700} className={classes.title}>
            Stock Recommendation Survey 
        </Text>

      </Group>
      <Text mt="sm" mb="md" c="dimmed" fz="xs">
        Wondering which companies fit your financial situation and personal values? Let Wealth Wise AI Guide you!
      </Text>
      <Button onClick={handleButtonClick}>Start Here</Button> 
    </Card>
  )
}

