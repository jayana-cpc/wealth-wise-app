"use client";
import React, { useState } from "react";
import {
  Container,
  Title,
  Text,
  Radio,
  Button,
  Space,
  Paper,
  Modal,
} from "@mantine/core";

const questions = [
  {
    question:
      "What are the two key components that determine demand for a good or service?",
    options: [
      "Price and quantity",
      "Willingness to buy and ability to pay",
      "Supply and demand",
      "Income and taste",
    ],
    correctAnswer: "Willingness to buy and ability to pay",
    explanation:
      "Demand is determined by a buyer's willingness to buy and their ability to pay for the good or service.",
  },
  {
    question:
      "According to the Law of Demand, there is a relationship between the price of a good and the quantity demanded. How are these two related?",
    options: [
      "As price increases, quantity demanded increases",
      "As price increases, quantity demanded decreases",
      "Price and quantity demanded are unrelated",
      "Price and quantity demanded are always equal",
    ],
    correctAnswer: "As price increases, quantity demanded decreases",
    explanation:
      "The Law of Demand states that, all other things being equal, as the price of a good or service increases, the quantity demanded decreases.",
  },
  {
    question:
      "Which of the following is NOT a factor that can shift the entire demand curve for a product?",
    options: [
      "A change in the price of the product itself",
      "A change in consumer income",
      "A change in consumer preferences",
      "A change in the population",
    ],
    correctAnswer: "A change in the price of the product itself",
    explanation:
      "A change in the price of the product itself causes a movement along the demand curve, not a shift of the entire demand curve.",
  },
  {
    question:
      "If two goods are complements, like peanut butter and jelly, how does a price increase in one affect the demand for the other?",
    options: [
      "Demand for the other good increases",
      "Demand for the other good decreases",
      "There is no effect on the demand for the other good",
      "Demand for both goods increases",
    ],
    correctAnswer: "Demand for the other good decreases",
    explanation:
      "When the price of one complementary good increases, the demand for the other good typically decreases because the combined cost is higher.",
  },
  {
    question:
      "If consumers expect the price of a good to rise in the future, what is likely to happen to the current demand for that good?",
    options: [
      "Demand will increase",
      "Demand will decrease",
      "Demand will remain unchanged",
      "It is impossible to predict",
    ],
    correctAnswer: "Demand will increase",
    explanation:
      "If consumers expect prices to rise in the future, they are likely to buy more now to avoid higher costs later, thus increasing current demand.",
  },
];

const MCQ = ({
  question,
  options,
  correctAnswer,
  explanation,
  attempts,
  setAttempts,
  feedback,
  setFeedback,
}) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [opened, setOpened] = useState(false);

  const handleSubmit = () => {
    if (attempts >= 3) return;

    if (selectedOption === correctAnswer) {
      setFeedback("Correct! Great job!");
    } else {
      setFeedback("Incorrect. Try again.");
      setAttempts(attempts + 1);
    }

    if (attempts >= 2) {
      setFeedback(
        `You have used all your attempts. The correct answer is: ${correctAnswer}`,
      );
    }
  };

  return (
    <Paper shadow="sm" p="md" mt="md">
      <Title order={3}>{question}</Title>
      <Space h="sm" />
      <Radio.Group value={selectedOption} onChange={setSelectedOption}>
        {options.map((option, index) => (
          <div key={index}>
            <Radio key={index} value={option} label={option} />
            <Space h="xs" />
          </div>
        ))}
      </Radio.Group>
      <Space h="sm" />
      <Button onClick={handleSubmit} disabled={attempts >= 3}>
        {attempts >= 3 ? "Show Answer" : "Submit"}
      </Button>
      <Space h="sm" />
      {feedback && (
        <Text color={attempts >= 3 ? "red" : "blue"}>
          {feedback}
          {attempts >= 3 && (
            <Button variant="subtle" onClick={() => setOpened(true)} ml="md">
              Explanation
            </Button>
          )}
        </Text>
      )}
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Explanation"
      >
        <Text>{explanation}</Text>
      </Modal>
    </Paper>
  );
};

export function MultipleChoiceQuestions() {
  const [attempts, setAttempts] = useState(Array(questions.length).fill(0));
  const [feedback, setFeedback] = useState(Array(questions.length).fill(""));

  return (
    <Container>
      <Title order={2}>Multiple Choice Questions</Title>
      {questions.map((q, index) => (
        <MCQ
          key={index}
          question={q.question}
          options={q.options}
          correctAnswer={q.correctAnswer}
          explanation={q.explanation}
          attempts={attempts[index]}
          setAttempts={(value) =>
            setAttempts(attempts.map((a, i) => (i === index ? value : a)))
          }
          feedback={feedback[index]}
          setFeedback={(value) =>
            setFeedback(feedback.map((f, i) => (i === index ? value : f)))
          }
        />
      ))}
    </Container>
  );
}
