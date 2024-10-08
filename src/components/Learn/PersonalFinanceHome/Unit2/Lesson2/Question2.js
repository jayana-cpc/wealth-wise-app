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
      const savedAttempts =
        parseInt(localStorage.getItem("question11Attempts")) || 0;
      const savedFeedback = localStorage.getItem("question11Feedback") || "";
      setAttempts(savedAttempts);
      setFeedback(savedFeedback);
    }
  }, []);

  useEffect(() => {
    if (attempts >= 3 && correctAnswer) {
      const finalFeedback = `You have used all your attempts. The correct answer is: ${correctAnswer}`;
      setFeedback(finalFeedback);
      if (typeof window !== "undefined") {
        localStorage.setItem("question11Feedback", finalFeedback);
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
          content: `Evaluate the following answer for the question about the potential reasons for the discrepancy between expected and actual net pay on a paycheck and how to determine if the correct amount of taxes and deductions have been withheld. If the answer is correct, respond with "Correct". If the answer is incorrect, respond with "Incorrect" and provide a helpful response but do not reveal answer.`,
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
          localStorage.setItem("question11Feedback", "Correct! Great job!");
        }
      } else if (aiFeedback.startsWith("Incorrect")) {
        setFeedback(aiFeedback);
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        if (typeof window !== "undefined") {
          localStorage.setItem("question11Attempts", newAttempts);
          localStorage.setItem("question11Feedback", aiFeedback);
        }
      } else {
        setFeedback("Unexpected response from AI. Please try again.");
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "question11Feedback",
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
          "question11Feedback",
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
        You receive your first paycheck at a new job and notice that your net
        pay is significantly lower than you expected based on your hourly wage.
        What are the potential reasons for this discrepancy? How can you
        determine if the correct amount of taxes and deductions have been
        withheld?
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
          Several factors can contribute to a lower-than-expected net pay:
        </Text>
        <List>
          <List.Item>
            <b>Taxes:</b> Federal, state, and local income taxes, as well as
            FICA taxes (Social Security and Medicare), are deducted from your
            gross pay.
          </List.Item>
          <List.Item>
            <b>Health insurance premiums:</b> If you participate in your
            employer&apos;s health insurance plan, a portion of the premium is
            typically deducted from your paycheck.
          </List.Item>
          <List.Item>
            <b>Other deductions:</b> Additional deductions might include
            retirement contributions (401(k)), life insurance, or other optional
            deductions.
          </List.Item>
        </List>
        <Text>
          To verify the accuracy of your paycheck, review the pay stub
          carefully. It should itemize all deductions. If you still have
          questions, contact your employer&apos;s payroll department for
          clarification. You can also use online paycheck calculators or tax
          preparation software to estimate your expected net pay.
        </Text>
      </Modal>
    </div>
  );
}
