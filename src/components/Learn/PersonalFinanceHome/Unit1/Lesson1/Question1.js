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

  // This useEffect hook will run only on the client-side
  useEffect(() => {
    const storedAttempts =
      parseInt(localStorage.getItem("question1Attempts")) || 0;
    const storedFeedback = localStorage.getItem("question1Feedback") || "";
    setAttempts(storedAttempts);
    setFeedback(storedFeedback);

    if (storedAttempts >= 3 && correctAnswer) {
      const finalFeedback = `You have used all your attempts. The correct answer is: ${correctAnswer}`;
      setFeedback(finalFeedback);
      localStorage.setItem("question1Feedback", finalFeedback);
    }
  }, [correctAnswer]);

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
          content: `Evaluate the following answer for the question about what to do with a work bonus considering the need for a new TV, new tires for the car, and saving for a house down payment. If the answer is correct, respond with "Correct". If the answer is incorrect, respond with "Incorrect" and provide a helpful response but do not reveal answer.`,
        },
        {
          role: "user",
          content: userInput,
        },
      ],
      temperature: 1,
      max_tokens: 300,
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
        localStorage.setItem("question1Feedback", "Correct! Great job!");
      } else if (aiFeedback.startsWith("Incorrect")) {
        setFeedback(aiFeedback);
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        localStorage.setItem("question1Attempts", newAttempts);
        localStorage.setItem("question1Feedback", aiFeedback);
      } else {
        setFeedback("Unexpected response from AI. Please try again.");
        localStorage.setItem(
          "question1Feedback",
          "Unexpected response from AI. Please try again.",
        );
      }

      if (attempts >= 2) {
        setCorrectAnswer(aiFeedback.replace("Incorrect. ", ""));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setFeedback(
        "There was an error processing your answer. Please try again.",
      );
      localStorage.setItem(
        "question1Feedback",
        "There was an error processing your answer. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Title order={3}>Question 1:</Title>
      <Space h="sm" />

      <Text>
        You just received a work bonus. You&rsquo;ve been wanting a new TV for a
        while, and this seems like the perfect opportunity to splurge. However,
        your car needs new tires soon, and you also know you should start saving
        more for a down payment on a house in a few years. What should you do?
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
          Create a budget: allocate some for the TV (considering your needs, not
          just wants), allocate funds for car tires, and plan to save the rest
          for the house down payment.
        </Text>
      </Modal>
    </div>
  );
}
