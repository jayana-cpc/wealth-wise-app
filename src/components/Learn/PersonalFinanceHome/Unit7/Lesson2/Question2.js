import React, { useState, useEffect } from "react";
import { Title, Text, Input, Button, Space, Modal } from "@mantine/core";

const apiKey = process.env.NEXT_PUBLIC_OPEN_AI_API_KEY;

export function RentersInsurance() {
  const [userInput, setUserInput] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setAttempts(
        parseInt(localStorage.getItem("rentersInsuranceAttempts")) || 0,
      );
      setFeedback(localStorage.getItem("rentersInsuranceFeedback") || "");
    }
  }, []);

  useEffect(() => {
    if (attempts >= 3 && correctAnswer) {
      const finalFeedback = `You have used all your attempts. The correct answer is: ${correctAnswer}`;
      setFeedback(finalFeedback);
      if (typeof window !== "undefined") {
        localStorage.setItem("rentersInsuranceFeedback", finalFeedback);
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
          content: `Evaluate the following answer for the question about Alex's renters insurance options. If the answer is correct, respond with "Correct". If the answer is incorrect, respond with "Incorrect" and provide a helpful response.`,
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
            "rentersInsuranceFeedback",
            "Correct! Great job!",
          );
        }
      } else if (aiFeedback.startsWith("Incorrect")) {
        setFeedback(aiFeedback);
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        if (typeof window !== "undefined") {
          localStorage.setItem("rentersInsuranceAttempts", newAttempts);
          localStorage.setItem("rentersInsuranceFeedback", aiFeedback);
        }
      } else {
        setFeedback("Unexpected response from AI. Please try again.");
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "rentersInsuranceFeedback",
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
          "rentersInsuranceFeedback",
          "There was an error processing your answer. Please try again.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Title order={3}>Question: Renters Insurance</Title>
      <Space h="sm" />
      <Text>
        <strong>Scenario: </strong>Alex is renting an apartment and is deciding
        whether to purchase renters insurance. He knows that the building owner
        has insurance but is unsure if he needs his own policy. He also
        considers whether his personal belongings would be covered if he were to
        experience a theft or fire.
      </Text>
      <Space h="sm" />
      <Text>
        Why is it important for Alex to purchase renters insurance despite the
        building owner having their own insurance? What specific types of
        coverage does renters insurance provide that the building owner&rsquo;s
        insurance does not?
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
              Alex should purchase renters insurance because the building
              owner&rsquo;s insurance only covers the physical structure of the
              building and not the tenant&apos;s personal belongings. Renters
              insurance provides coverage for personal property against losses
              from theft, fire, or other covered events. Additionally, it offers
              liability coverage in case someone is injured in Alex&rsquo;s
              apartment and medical payments for guests injured on his property.
            </Text>
          </Modal>
          <Button onClick={() => setModalOpened(true)}>Example Answer</Button>
        </>
      )}
    </div>
  );
}
