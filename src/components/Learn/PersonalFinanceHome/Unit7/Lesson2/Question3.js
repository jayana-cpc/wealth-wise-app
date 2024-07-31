import React, { useState, useEffect } from "react";
import { Title, Text, Input, Button, Space, Modal } from "@mantine/core";

const apiKey = process.env.NEXT_PUBLIC_OPEN_AI_API_KEY;

export function ExtendedWarranties() {
  const [userInput, setUserInput] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setAttempts(
        parseInt(localStorage.getItem("extendedWarrantiesAttempts")) || 0,
      );
      setFeedback(localStorage.getItem("extendedWarrantiesFeedback") || "");
    }
  }, []);

  useEffect(() => {
    if (attempts >= 3 && correctAnswer) {
      const finalFeedback = `You have used all your attempts. The correct answer is: ${correctAnswer}`;
      setFeedback(finalFeedback);
      if (typeof window !== "undefined") {
        localStorage.setItem("extendedWarrantiesFeedback", finalFeedback);
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
          content: `Evaluate the following answer for the question about Emma&apos;s decision to purchase an extended warranty for her dishwasher. If the answer is correct, respond with "Correct". If the answer is incorrect, respond with "Incorrect" and provide a helpful response.`,
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
          localStorage.setItem(
            "extendedWarrantiesFeedback",
            "Correct! Great job!",
          );
        }
      } else if (aiFeedback.startsWith("Incorrect")) {
        setFeedback(aiFeedback);
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        if (typeof window !== "undefined") {
          localStorage.setItem("extendedWarrantiesAttempts", newAttempts);
          localStorage.setItem("extendedWarrantiesFeedback", aiFeedback);
        }
      } else {
        setFeedback("Unexpected response from AI. Please try again.");
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "extendedWarrantiesFeedback",
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
          "extendedWarrantiesFeedback",
          "There was an error processing your answer. Please try again.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Title order={3}>Question: Extended Warranties</Title>
      <Space h="sm" />
      <Text>
        <strong>Scenario: </strong>Emma is considering purchasing an extended
        warranty for her new dishwasher. The extended warranty costs $150
        annually and covers repairs and replacement of parts not covered by the
        manufacturer&apos;s warranty. Emma has a choice between buying the
        extended warranty or setting aside $150 in an emergency fund each year
        to cover potential repair costs.
      </Text>
      <Space h="sm" />
      <Text>
        What factors should Emma consider when deciding whether to purchase the
        extended warranty or save the money in an emergency fund? How can she
        evaluate which option might be more beneficial in the long run?
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
        <>
          <Modal
            opened={modalOpened}
            onClose={() => setModalOpened(false)}
            title="Example Answer"
          >
            <Text>
              Emma should consider factors such as the likelihood of needing
              repairs, the cost of potential repairs, and her financial comfort
              with self-insuring. If the cost of repairs is generally low and
              infrequent, saving the $150 annually might be more beneficial,
              especially if the warranty provider requires deductibles or has
              other limitations. On the other hand, if the dishwasher is prone
              to issues and repair costs are high, the extended warranty might
              provide peace of mind and financial protection. Emma should
              evaluate her risk tolerance, the warranty terms, and potential
              repair costs to make an informed decision.
            </Text>
          </Modal>
          <Button onClick={() => setModalOpened(true)}>Example Answer</Button>
        </>
      )}
    </div>
  );
}
