"use client";
import React, { useState } from 'react';
import { Container, Title, Text, Radio, Button, Space, Paper, Center, Modal } from '@mantine/core';

const questions = [
  {
    question: "What is a primary benefit of using a credit card for purchases?",
    options: [
      "You can obtain goods or services immediately and pay later.",
      "You avoid paying interest on all purchases.",
      "You receive a discount on all purchases.",
      "You can withdraw cash without any fees."
    ],
    correctAnswer: "You can obtain goods or services immediately and pay later.",
    explanation: "The primary benefit of using a credit card is the ability to obtain goods or services immediately and pay for them at a later date."
  },
  {
    question: "What type of credit card requires a security deposit and is designed for those with limited or poor credit histories?",
    options: [
      "Rewards Credit Card",
      "Standard Visa/MasterCard",
      "Secured Credit Card",
      "Travel Rewards Credit Card"
    ],
    correctAnswer: "Secured Credit Card",
    explanation: "A secured credit card requires a security deposit and is designed to help individuals with limited or poor credit histories build or rebuild their credit."
  },
  {
    question: "When considering which credit card to apply for, what should you prioritize if you frequently carry a balance?",
    options: [
      "The card’s annual fee",
      "The card’s rewards program",
      "The card’s APR (Annual Percentage Rate)",
      "The card’s design"
    ],
    correctAnswer: "The card’s APR (Annual Percentage Rate)",
    explanation: "If you frequently carry a balance, it is crucial to prioritize the card’s APR, as a lower APR will reduce the amount of interest you pay on the carried balance."
  },
  {
    question: "How can you avoid paying interest on your credit card purchases?",
    options: [
      "Pay only the minimum payment due each month.",
      "Pay off your balance in full each month.",
      "Make payments only once a year.",
      "Use the card for cash advances."
    ],
    correctAnswer: "Pay off your balance in full each month.",
    explanation: "To avoid paying interest on your credit card purchases, you should pay off your balance in full each month before the due date."
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
            <Radio key={index} value={option} label={option} />
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
