import {
  Card,
  Image,
  Button,
  Text,
  Group,
  Select,
} from "@mantine/core";
import classes from "./Unit5Card.module.css";
import { useRouter } from "next/navigation";

export function Unit5Card() {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/learn/personalFinance/unit5/lesson1");
  };

  const handleLessonSelect = (lesson) => {
    if (lesson) {
      router.push(
        `/learn/personalFinance/unit5/${lesson.toLowerCase().replace(" ", "")}`,
      );
    }
  };

  return (
    <Card withBorder padding="lg" className={classes.card}>
      <Card.Section>
        <Image
          src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Finance"
          height={200}
          className={classes.image}

        />
      </Card.Section>

      <Group justify="space-between" mt="xl">
        <Text fz="h4" fw={700} className={classes.title}>
          Unit 5: Credit
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
