import {
  Card,
  Image,
  Button,
  Text,
  Group,
  RingProgress,
  Select,
} from "@mantine/core";
import classes from "./Unit7Card.module.css";
import { useRouter } from "next/navigation";

export function Unit7Card() {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/learn/personalFinance/unit7/lesson1");
  };

  const handleLessonSelect = (lesson) => {
    if (lesson) {
      router.push(
        `/learn/personalFinance/unit7/${lesson.toLowerCase().replace(" ", "")}`,
      );
    }
  };

  return (
    <Card withBorder padding="lg" className={classes.card}>
      <Card.Section>
        <Image
          src="https://d2tez01fe91909.cloudfront.net/wp-content/uploads/2022/11/best-home-and-auto-insurance_Shutterstock_REDPIXEL.jpg"
          alt="Finance"
          height={200}
        />
      </Card.Section>

      <Group justify="space-between" mt="xl">
        <Text fz="h4" fw={700} className={classes.title}>
          Unit 7: Insurance
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
        Learn how to pick the first fund in your stock portfolio with
        interactive lessons.
      </Text>

      <Card.Section className={classes.mid}>
        <Select
          placeholder="Jump to Lessons"
          data={["Lesson 1", "Lesson 2"]}
          onChange={handleLessonSelect}
        />
      </Card.Section>

      <Button onClick={handleButtonClick}>Start Here</Button>
    </Card>
  );
}
