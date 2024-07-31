import React, { useState, useEffect } from "react";
import { Title, Text, Input, Button, Space, Modal } from "@mantine/core";

const apiKey = process.env.NEXT_PUBLIC_OPEN_AI_API_KEY;

export function HomeownersInsurance() {
  const [userInput, setUserInput] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setAttempts(
        parseInt(localStorage.getItem("homeownersInsuranceAttempts")) || 0,
      );
      setFeedback(localStorage.getItem("homeownersInsuranceFeedback") || "");
    }
  }, []);

  useEffect(() => {
    if (attempts >= 3 && correctAnswer) {
      const finalFeedback = `You have used all your attempts. The correct answer is: ${correctAnswer}`;
      setFeedback(finalFeedback);
      if (typeof window !== "undefined") {
        localStorage.setItem("homeownersInsuranceFeedback", finalFeedback);
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
          content: `Evaluate the following answer for the question about Sarah's homeowners insurance options. If the answer is correct, respond with "Correct". If the answer is incorrect, respond with "Incorrect" and provide a helpful response.`,
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
            "homeownersInsuranceFeedback",
            "Correct! Great job!",
          );
        }
      } else if (aiFeedback.startsWith("Incorrect")) {
        setFeedback(aiFeedback);
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        if (typeof window !== "undefined") {
          localStorage.setItem("homeownersInsuranceAttempts", newAttempts);
          localStorage.setItem("homeownersInsuranceFeedback", aiFeedback);
        }
      } else {
        setFeedback("Unexpected response from AI. Please try again.");
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "homeownersInsuranceFeedback",
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
          "homeownersInsuranceFeedback",
          "There was an error processing your answer. Please try again.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Title order={3}>Question: Homeowners Insurance</Title>
      <Space h="sm" />
      <Text>
        <strong>Scenario: </strong>Sarah has recently purchased a new home and
        is considering her homeowners insurance options. Her insurer offers her
        a choice between a $500 deductible with a premium of $1,200 annually or
        a $1,000 deductible with a premium of $950 annually. Sarah is
        financially comfortable with higher out-of-pocket expenses in the event
        of a claim.
      </Text>
      <Space h="sm" />
      <Text>
        Given Sarah&apos;s comfort with higher deductibles and the potential for
        lower premiums, what should she consider when deciding between the two
        deductible options? How might her choice impact her financial situation
        in case of a claim?
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
              Sarah should evaluate the potential savings of $250 on the premium
              by choosing the $1,000 deductible option against the higher
              out-of-pocket expense if a claim is made. If she is comfortable
              with the possibility of paying more in the event of a claim and
              prefers to save on premiums now, the higher deductible could be a
              good choice. She should ensure that she has sufficient savings to
              cover the $1,000 deductible in case of a claim.
            </Text>
          </Modal>
          <Button onClick={() => setModalOpened(true)}>Example Answer</Button>
        </>
      )}
    </div>
  );
}
