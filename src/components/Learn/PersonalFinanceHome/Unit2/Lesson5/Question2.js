import React, { useState, useEffect } from "react";
import { Title, Text, Input, Button, Space, Modal, List } from "@mantine/core";

const apiKey = process.env.NEXT_PUBLIC_OPEN_AI_API_KEY;

export function Question2() {
  const [userInput, setUserInput] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setAttempts(parseInt(localStorage.getItem("question15Attempts")) || 0);
      setFeedback(localStorage.getItem("question15Feedback") || "");
    }
  }, []);

  useEffect(() => {
    if (attempts >= 3 && correctAnswer) {
      const finalFeedback = `You have used all your attempts. The correct answer is: ${correctAnswer}`;
      setFeedback(finalFeedback);
      if (typeof window !== "undefined") {
        localStorage.setItem("question15Feedback", finalFeedback);
      }
    }
  }, [attempts, correctAnswer]);

  const handleSubmit = async () => {
    if (attempts >= 3) {
      return;
    }

    setLoading(true);

    const APIBody = {
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `Evaluate the following answer for the question about whether Emily, a single taxpayer, should itemize her deductions or take the standard deduction for tax year 2023. Calculate Emily&apos;s total itemized deductions and determine the best option based on her eligible expenses and the standard deduction amount for Single filers. If the answer is correct, respond with "Correct". If the answer is incorrect, respond with "Incorrect" and provide a helpful response but do not reveal answer.`,
        },
        {
          role: "user",
          content: userInput,
        },
      ],
      temperature: 1,
      max_tokens: 150,
    };

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + apiKey,
          },
          body: JSON.stringify(APIBody),
        },
      );

      const result = await response.json();
      const aiFeedback = result.choices[0].message.content.trim();

      if (aiFeedback.startsWith("Correct")) {
        setFeedback("Correct! Great job!");
        if (typeof window !== "undefined") {
          localStorage.setItem("question15Feedback", "Correct! Great job!");
        }
      } else if (aiFeedback.startsWith("Incorrect")) {
        setFeedback(aiFeedback);
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        if (typeof window !== "undefined") {
          localStorage.setItem("question15Attempts", newAttempts);
          localStorage.setItem("question15Feedback", aiFeedback);
        }
      } else {
        setFeedback("Unexpected response from AI. Please try again.");
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "question15Feedback",
            "Unexpected response from AI. Please try again.",
          );
        }
      }

      if (attempts >= 2) {
        setCorrectAnswer(aiFeedback.replace("Incorrect. ", ""));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setFeedback(
        "There was an error processing your answer. Please try again.",
      );
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "question15Feedback",
          "There was an error processing your answer. Please try again.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Title order={3}>Question 2:</Title>
      <Space h="sm" />

      <Text>
        Emily is a single taxpayer with the following expenses for tax year
        2023:
      </Text>
      <List withPadding>
        <List.Item>Mortgage interest: $7,500</List.Item>
        <List.Item>State income taxes: $4,000</List.Item>
        <List.Item>Charitable contributions: $1,200</List.Item>
        <List.Item>Medical expenses: $3,000</List.Item>
      </List>
      <Text>
        The standard deduction for Single filers is $12,950. Calculate
        Emily&apos;s total itemized deductions and determine whether she should
        itemize deductions or take the standard deduction. Explain your
        reasoning based on Emily&apos;s eligible expenses and the standard
        deduction amount for Single filers.
      </Text>
      <Space h="sm" />

      <Input
        placeholder="Input your answer"
        value={userInput}
        onChange={(event) => setUserInput(event.currentTarget.value)}
      />
      <Space h="sm" />

      <Button onClick={handleSubmit} disabled={loading || attempts >= 3}>
        {loading ? "Loading..." : "Submit"}
      </Button>
      <Space h="sm" />

      {feedback && (
        <Text color={attempts >= 3 ? "red" : "blue"}>{feedback}</Text>
      )}
      {attempts >= 3 && (
        <Button onClick={() => setModalOpened(true)} color="gray">
          Example Solution
        </Button>
      )}

      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title="Example Solution"
      >
        <Text>
          Emily should take the standard deduction. Here&apos;s the reasoning:
        </Text>
        <List>
          <List.Item>
            Total itemized deductions = $7,500 (mortgage interest) + $4,000
            (state income taxes) + $1,200 (charitable contributions) + $3,000
            (medical expenses) = $15,700
          </List.Item>
          <List.Item>Standard deduction for Single filers = $12,950</List.Item>
        </List>
        <Text>
          Although Emily&apos;s total itemized deductions ($15,700) exceed the
          standard deduction amount ($12,950), she may benefit more from taking
          the standard deduction. This is because the difference between her
          itemized deductions and the standard deduction amount isn&apos;t
          substantial enough to significantly lower her taxable income. Taking
          the standard deduction simplifies her tax filing process and ensures
          she receives a predictable tax benefit without the need for additional
          documentation or potential limitations associated with itemized
          deductions.
        </Text>
      </Modal>
    </div>
  );
}
