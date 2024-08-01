import React, { useState, useEffect } from "react";
import { Title, Text, Input, Button, Space, Modal } from "@mantine/core";

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
      setAttempts(parseInt(localStorage.getItem("question1Attempts")) || 0);
      setFeedback(localStorage.getItem("question1Feedback") || "");
    }
  }, []);

  useEffect(() => {
    if (attempts >= 3 && correctAnswer) {
      const finalFeedback = `You have used all your attempts. The correct answer is: ${correctAnswer}`;
      setFeedback(finalFeedback);
      if (typeof window !== "undefined") {
        localStorage.setItem("question1Feedback", finalFeedback);
      }
    }
  }, [attempts, correctAnswer]);

  const handleSubmit = async () => {
    if (attempts >= 3) {
      return;
    }

    setLoading(true);

    const APIBody = {
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `Evaluate the following answer for the question about how a drought affecting corn crops would impact the supply of corn and the price of corn tortillas. If the answer is correct, respond with "Correct". If the answer is incorrect, respond with "Incorrect" and provide a helpful response but do not reveal answer.`,
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
          localStorage.setItem("question1Feedback", "Correct! Great job!");
        }
      } else if (aiFeedback.startsWith("Incorrect")) {
        setFeedback(aiFeedback);
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        if (typeof window !== "undefined") {
          localStorage.setItem("question1Attempts", newAttempts);
          localStorage.setItem("question1Feedback", aiFeedback);
        }
      } else {
        setFeedback("Unexpected response from AI. Please try again.");
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "question1Feedback",
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
          "question1Feedback",
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
        Explain how a drought affecting corn crops would impact the supply of
        corn and the price of corn tortillas.
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
          A drought affecting corn crops would likely decrease the supply of
          corn, as less corn would be produced. With a lower supply of corn, the
          price of corn would increase. This increase in the price of corn would
          also raise the cost of corn tortillas, as corn is the primary
          ingredient. Therefore, a drought would lead to higher prices for corn
          tortillas due to the decreased supply of corn.
        </Text>
      </Modal>
    </div>
  );
}
