"use client";
import React, { useState } from 'react';
import { Container, Title, Text, Radio, Button, Space, Paper, Modal } from '@mantine/core';

const questions = [
  {
    question: "The law of supply states that:",
    options: ["As price increases, quantity supplied decreases.", "As price increases, quantity supplied increases.", "Price and quantity supplied are unrelated.", "Quantity supplied determines price."],
    correctAnswer: "As price increases, quantity supplied increases.",
    explanation: "The law of supply states that as the price of a good or service increases, the quantity supplied will also increase, assuming all other factors remain constant.",
  },
  {
    question: "Which of the following would cause a shift to the left in the supply curve for a product?",
    options: ["A decrease in the price of inputs.", "An improvement in technology.", "A natural disaster that damages production facilities.", "A decrease in government regulations."],
    correctAnswer: "A natural disaster that damages production facilities.",
    explanation: "A shift to the left in the supply curve indicates a decrease in supply. A natural disaster that damages production facilities would reduce the ability to produce goods, thus decreasing supply.",
  },
  {
    question: "A surplus occurs when:",
    options: ["Quantity demanded is greater than quantity supplied.", "Quantity supplied is greater than quantity demanded.", "Price is higher than equilibrium price.", "Price is lower than equilibrium price."],
    correctAnswer: "Quantity supplied is greater than quantity demanded.",
    explanation: "A surplus occurs when the quantity supplied of a good exceeds the quantity demanded at a given price.",
  },
  {
    question: "Which of the following is NOT a factor that can shift the supply curve?",
    options: ["A change in the price of the good itself.", "A change in the price of inputs.", "A change in technology.", "A change in government regulations."],
    correctAnswer: "A change in the price of the good itself.",
    explanation: "A change in the price of the good itself causes a movement along the supply curve, not a shift of the entire supply curve.",
  },
  {
    question: "An increase in the number of sellers in a market will typically:",
    options: ["Increase supply.", "Decrease supply.", "Not affect supply.", "Increase demand."],
    correctAnswer: "Increase supply.",
    explanation: "An increase in the number of sellers in a market increases the market supply because more producers are offering goods or services for sale.",
  }
];

const MCQ = ({ question, options, correctAnswer, explanation, attempts, setAttempts, feedback, setFeedback }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [opened, setOpened] = useState(false);

  const handleSubmit = () => {
    if (attempts >= 3) return;

    if (selectedOption === correctAnswer) {
      setFeedback('Correct! Great job!');
    } else {
      setFeedback('Incorrect. Try again.');
      setAttempts(attempts + 1);
    }

    if (attempts >= 2) {
      setFeedback(`You have used all your attempts. The correct answer is: ${correctAnswer}`);
    }
  };

  return (
    <Paper shadow="sm" p="md" mt="md">
      <Title order={3}>{question}</Title>
      <Space h="sm" />
      <Radio.Group value={selectedOption} onChange={setSelectedOption}>
        {options.map((option, index) => (
          <div key={index}>
            <Radio value={option} label={option} />
            <Space h="xs" />
          </div>
        ))}
      </Radio.Group>
      <Space h="sm" />
      <Button onClick={handleSubmit} disabled={attempts >= 3}>
        {attempts >= 3 ? 'Show Answer' : 'Submit'}
      </Button>
      <Space h="sm" />
      {feedback && (
        <Text color={attempts >= 3 ? 'red' : 'blue'}>
          {feedback}
          {attempts >= 3 && (
            <Button variant="subtle" onClick={() => setOpened(true)} ml="md">
              Explanation
            </Button>
          )}
        </Text>
      )}
      <Modal opened={opened} onClose={() => setOpened(false)} title="Explanation">
        <Text>{explanation}</Text>
      </Modal>
    </Paper>
  );
};

export function MultipleChoiceQuestions() {
  const [attempts, setAttempts] = useState(Array(questions.length).fill(0));
  const [feedback, setFeedback] = useState(Array(questions.length).fill(''));

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
          setAttempts={(value) => setAttempts(attempts.map((a, i) => (i === index ? value : a)))}
          feedback={feedback[index]}
          setFeedback={(value) => setFeedback(feedback.map((f, i) => (i === index ? value : f)))}
        />
      ))}
    </Container>
  );
}

export default MultipleChoiceQuestions;
