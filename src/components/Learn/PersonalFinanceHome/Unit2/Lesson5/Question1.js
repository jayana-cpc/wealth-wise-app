import React, { useState, useEffect } from "react";
import { Title, Text, Input, Button, Space, Modal, List } from "@mantine/core";

const apiKey = process.env.NEXT_PUBLIC_OPEN_AI_API_KEY;

export function Question1() {
  const [userInput, setUserInput] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setAttempts(parseInt(localStorage.getItem("question14Attempts")) || 0);
      setFeedback(localStorage.getItem("question14Feedback") || "");
    }
  }, []);

  useEffect(() => {
    if (attempts >= 3 && correctAnswer) {
      const finalFeedback = `You have used all your attempts. The correct answer is: ${correctAnswer}`;
      setFeedback(finalFeedback);
      if (typeof window !== "undefined") {
        localStorage.setItem("question14Feedback", finalFeedback);
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
          content: `Evaluate the following answer for the question about whether Sarah and Michael should itemize their deductions or take the standard deduction for tax year 2023. Justify the answer based on their total itemized deductions and the standard deduction amount. If the answer is correct, respond with "Correct". If the answer is incorrect, respond with "Incorrect" and provide a helpful response but do not reveal answer.`,
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
          localStorage.setItem("question14Feedback", "Correct! Great job!");
        }
      } else if (aiFeedback.startsWith("Incorrect")) {
        setFeedback(aiFeedback);
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        if (typeof window !== "undefined") {
          localStorage.setItem("question14Attempts", newAttempts);
          localStorage.setItem("question14Feedback", aiFeedback);
        }
      } else {
        setFeedback("Unexpected response from AI. Please try again.");
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "question14Feedback",
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
          "question14Feedback",
          "There was an error processing your answer. Please try again.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Title order={3}>Question 1:</Title>
      <Space h="sm" />
      <Text>
        Sarah and Michael are a married couple filing jointly for tax year 2023.
        They incurred the following expenses:
      </Text>
      <List withPadding>
        <List.Item>Mortgage interest: $15,000</List.Item>
        <List.Item>State income taxes: $8,000</List.Item>
        <List.Item>Charitable contributions: $3,500</List.Item>
        <List.Item>Medical expenses: $5,000</List.Item>
      </List>
      <Text>
        The standard deduction for Married Filing Jointly is $25,900. Should
        Sarah and Michael itemize their deductions or take the standard
        deduction? Justify your answer based on their total itemized deductions
        and the standard deduction amount.
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
          Sarah and Michael should itemize their deductions. Here&apos;s the
          reasoning:
        </Text>
        <List>
          <List.Item>
            Total itemized deductions = $15,000 (mortgage interest) + $8,000
            (state income taxes) + $3,500 (charitable contributions) + $5,000
            (medical expenses) = $31,500
          </List.Item>
          <List.Item>
            Standard deduction for Married Filing Jointly = $25,900
          </List.Item>
        </List>
        <Text>
          Since their total itemized deductions ($31,500) exceed the standard
          deduction amount ($25,900), Sarah and Michael would benefit from
          itemizing their deductions. Itemizing allows them to reduce their
          taxable income by a larger amount, potentially lowering their tax
          liability or increasing their tax refund compared to taking the
          standard deduction.
        </Text>
      </Modal>
    </div>
  );
}
