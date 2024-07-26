import { Card, Image, Button, Text, Group, RingProgress, Select } from "@mantine/core"
import classes from "./Unit3Card.module.css"
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const stats = [
  { title: "Distance", value: "27.4 km" },
  { title: "Avg. speed", value: "9.6 km/h" },
  { title: "Score", value: "88/100" }
]

export function Unit3Card() {
  const [selectedLesson, setSelectedLesson] = useState('');
  const items = stats.map(stat => (
    <div key={stat.title}>
      <Text size="xs" color="dimmed">
        {stat.title}
      </Text>
      <Text fw={500} size="sm">
        {stat.value}
      </Text>
    </div>
  ));
  
  const router = useRouter();
  
  const handleButtonClick = () => {
    router.push('/learn/personalFinance/unit3');
  };

  const handleLessonSelect = (lesson) => {
    if (lesson) {
      router.push(`/learn/personalFinance/unit3/${lesson.toLowerCase().replace(' ', '')}`);
    }
  };

  return (
    <Card withBorder padding="lg" className={classes.card}>
      <Card.Section>
        <Image
          src="https://images.unsplash.com/photo-1640340434855-6084b1f4901c?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Finance"
          height={200}
        />
      </Card.Section>

      <Group justify="space-between" mt="xl">
        <Text fz="h4" fw={700} className={classes.title}>
          Unit 3
        </Text>
        <Group gap={5}>
          <Text fz="xs" c="dimmed">
            80% completed
          </Text>
          <RingProgress
            size={18}
            thickness={2}
            sections={[{ value: 80, color: "blue" }]}
          />
        </Group>
      </Group>
      
      <Text mt="sm" mb="md" c="dimmed" fz="xs">
        Learn how to pick the first fund in your stock portfolio with interactive lessons.
      </Text>
      
      <Card.Section className={classes.mid}>
        <Select 
          placeholder="Jump to Lessons" 
          data={['Lesson 1', 'Lesson 2']} 
          onChange={handleLessonSelect}
        />
      </Card.Section>

      <Button onClick={handleButtonClick}>Start Here</Button>
    </Card>
  );
}
