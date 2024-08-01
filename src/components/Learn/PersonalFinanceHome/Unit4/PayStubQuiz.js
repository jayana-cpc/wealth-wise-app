import React, { useState } from "react";
import {
  Container,
  Paper,
  Title,
  Text,
  TextInput,
  Button,
  Notification,
} from "@mantine/core";
import Image from "next/image";

const PayStubQuiz = () => {
  const [grossPay, setGrossPay] = useState("");
  const [deductions, setDeductions] = useState("");
  const [netPay, setNetPay] = useState("");
  const [tries, setTries] = useState(0);
  const [result, setResult] = useState("");
  const [showResult, setShowResult] = useState(false);

  const correctAnswers = {
    grossPay: "168.00",
    deductions: "43.09",
    netPay: "124.91",
  };

  const handleSubmit = () => {
    setTries(tries + 1);

    if (
      grossPay === correctAnswers.grossPay &&
      deductions === correctAnswers.deductions &&
      netPay === correctAnswers.netPay
    ) {
      setResult("Correct! Well done.");
      setShowResult(true);
    } else if (tries >= 2) {
      setResult(
        `Incorrect. The correct answers are:
         Gross Pay: $${correctAnswers.grossPay}
         Deductions: $${correctAnswers.deductions}
         Net Pay: $${correctAnswers.netPay}`,
      );
      setShowResult(true);
    } else {
      setResult("Incorrect. Try again.");
    }
  };

  return (
    <Container size="sm">
      <Paper shadow="md" padding="md">
        <Image
          src="https://i.imgur.com/XtbJMma.png" // Replace with your external image URL
          alt="Pay Stub"
          width={500}
          height={300}
          layout="responsive"
        />
        <Title order={2}>Pay Stub Quiz</Title>
        <Text>
          Based on the provided pay stub image, please answer the following
          questions:
        </Text>
        <Text mt="md">1. How much is Jane Doe’s gross pay?</Text>
        <TextInput
          value={grossPay}
          onChange={(event) => setGrossPay(event.currentTarget.value)}
          placeholder="Gross Pay"
          mt="xs"
        />
        <Text mt="md">2. What deductions did Jane have this pay period?</Text>
        <TextInput
          value={deductions}
          onChange={(event) => setDeductions(event.currentTarget.value)}
          placeholder="Deductions"
          mt="xs"
        />
        <Text mt="md">3. What is Jane Doe’s net pay?</Text>
        <TextInput
          value={netPay}
          onChange={(event) => setNetPay(event.currentTarget.value)}
          placeholder="Net Pay"
          mt="xs"
        />
        <Button onClick={handleSubmit} mt="md">
          Submit
        </Button>
        {result && (
          <Notification mt="md" color={showResult ? "teal" : "red"}>
            {result}
          </Notification>
        )}
      </Paper>
    </Container>
  );
};

export default PayStubQuiz;
