import {
  Card,
  Image,
  Button,
  Text,
  Group,
  RingProgress,
  Select,
} from "@mantine/core";
import classes from "./Unit6Card.module.css";
import { useRouter } from "next/navigation";

export function Unit6Card() {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/learn/personalFinance/unit6");
  };

  const handleLessonSelect = (lesson) => {
    if (lesson) {
      router.push(`/learn/personalFinance/unit6`);
    }
  };

  return (
    <Card withBorder padding="lg" className={classes.card}>
      <Card.Section>
        <Image
          src="https://www.investopedia.com/thmb/9iEO8TGp6Qimx39dBTFlulWjGcs=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/INV_TopStocksJuly2023_GettyImages-1265501626-152d1083c0f34d7db88b068051d965de.jpg"
          alt="Finance"
          height={200}
        />
      </Card.Section>

      <Group justify="space-between" mt="xl">
        <Text fz="h4" fw={700} className={classes.title}>
          Unit 6: Financial Investing
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
          data={["Lesson 1"]}
          onChange={handleLessonSelect}
        />
      </Card.Section>

      <Button onClick={handleButtonClick}>Start Here</Button>
    </Card>
  );
}
