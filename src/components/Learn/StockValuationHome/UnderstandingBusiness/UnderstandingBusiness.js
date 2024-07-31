import React from "react";
import {
  Title,
  Center,
  Text,
  Button,
  Container,
  Paper,
  Space,
} from "@mantine/core";
import { StockDescription } from "./StockDescription";
import { ValProposition } from "./ValProposition";
import { IndustryIdentify } from "./IndustryIdentify";
import { ForceDropdown } from "./ForceDropdown";
import "@/components/Learn/StockValuationHome/UnderstandingBusiness/NewsDisplay.module.css";
import { NewsDisplay } from "./NewsDisplay";
import { useRouter } from "next/navigation";

export function UnderstandingBusiness() {
  const router = useRouter();
  const handleButtonClick = () => {
    router.push("/learn/stockValuation/relativeValuationIntro");
  };

  return (
    <Container style={{ color: "white" }}>
      <Paper shadow="sm" p="md">
        <Space h="lg" />
        <Title order={1}>Understanding the Business</Title>
        <Space h="md" />
        <Text>
          Let&apos;s get a thorough overview of how your company functions.
        </Text>
        <Space h="lg" />
        <Title order={2}>Stock Description</Title>
        <Space h="md" />
        <StockDescription />
        <Space h="lg" />
        <Title order={2}>Value Proposition</Title>
        <Space h="md" />
        <ValProposition />
        <Space h="lg" />
        <Title order={2}>
          <IndustryIdentify />
        </Title>
        <Center>
          <ForceDropdown />
        </Center>
        <Space h="md" />

        <Title order={2}>Analyze Current Sentiment</Title>
        <Space h="md" />
        <Text>
          It&apos;s important to gaige current sentiment about a company before
          investing in it. Look for events that could have a signficant impact
          on how people will perceive the company.
        </Text>
        <Space h="md" />

        <Center>
          <NewsDisplay />
        </Center>
      </Paper>

      <Center>
        <Button
          variant="gradient"
          gradient={{ from: "violet", to: "blue", deg: 153 }}
          size="compact-md"
          onClick={handleButtonClick}
        >
          Continue
        </Button>
      </Center>
    </Container>
  );
}
