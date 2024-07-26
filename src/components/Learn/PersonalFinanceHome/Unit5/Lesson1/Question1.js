import React, { useState, useEffect } from 'react';
import { Title, Text, Input, Button, Space, Modal, List } from '@mantine/core';

const apiKey = process.env.NEXT_PUBLIC_OPEN_AI_API_KEY;

export function CreditVsStoreCard() {
  const [userInput, setUserInput] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setAttempts(parseInt(localStorage.getItem('creditVsStoreCardAttempts')) || 0);
      setFeedback(localStorage.getItem('creditVsStoreCardFeedback') || '');
    }
  }, []);

  useEffect(() => {
    if (attempts >= 3 && correctAnswer) {
      const finalFeedback = `You have used all your attempts. The correct answer is: ${correctAnswer}`;
      setFeedback(finalFeedback);
      if (typeof window !== 'undefined') {
        localStorage.setItem('creditVsStoreCardFeedback', finalFeedback);
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
          content: `Evaluate the following answer for the question about the similarities and differences between credit cards and store cards. If the answer is correct, respond with "Correct". If the answer is incorrect, respond with "Incorrect" and provide a helpful response.`
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
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + apiKey,
        },
        body: JSON.stringify(APIBody),
      });

      const result = await response.json();
      const aiFeedback = result.choices[0].message.content.trim();

      if (aiFeedback.startsWith('Correct')) {
        setFeedback('Correct! Great job!');
        if (typeof window !== 'undefined') {
          localStorage.setItem('creditVsStoreCardFeedback', 'Correct! Great job!');
        }
      } else if (aiFeedback.startsWith('Incorrect')) {
        setFeedback(aiFeedback);
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        if (typeof window !== 'undefined') {
          localStorage.setItem('creditVsStoreCardAttempts', newAttempts);
          localStorage.setItem('creditVsStoreCardFeedback', aiFeedback);
        }
      } else {
        setFeedback('Unexpected response from AI. Please try again.');
        if (typeof window !== 'undefined') {
          localStorage.setItem('creditVsStoreCardFeedback', 'Unexpected response from AI. Please try again.');
        }
      }

      if (attempts >= 2) {
        setCorrectAnswer(aiFeedback.replace('Incorrect. ', ''));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setFeedback('There was an error processing your answer. Please try again.');
      if (typeof window !== 'undefined') {
        localStorage.setItem('creditVsStoreCardFeedback', 'There was an error processing your answer. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Title order={3}>Credit Cards vs. Store Cards</Title>
      <Space h="sm" />

      <Text>
        Explain the similarities and differences between credit cards and store cards.
      </Text>
      <Space h="sm" />

      <Input 
        placeholder="Input your answer" 
        value={userInput}
        onChange={(event) => setUserInput(event.currentTarget.value)}
      />
      <Space h="sm" />

      <Button onClick={handleSubmit} disabled={loading || attempts >= 3}>
        {loading ? 'Loading...' : 'Submit'}
      </Button>
      <Space h="sm" />

      {feedback && (
        <Text color={attempts >= 3 ? 'red' : 'blue'}>{feedback}</Text>
      )}

      {attempts >= 3 && (
        <>
          <Modal opened={modalOpened} onClose={() => setModalOpened(false)} title="Example Answer">
            <Text>
              Credit cards and store cards are both forms of credit that allow consumers to make purchases with borrowed money. 
              However, they have distinct characteristics and considerations:
            </Text>
            <Text><b>Similarities:</b></Text>
            <List withPadding>
              <List.Item>Both credit cards and store cards allow users to defer payment for purchases, essentially taking out a short-term loan.</List.Item>
              <List.Item>They typically charge interest on outstanding balances that are not paid off by the due date.</List.Item>
              <List.Item>Both types of cards may offer rewards or incentives for usage, such as cashback, points, or discounts.</List.Item>
            </List>
            <Text><b>Differences:</b></Text>
            <List withPadding>
              <List.Item><b>Interest Rates:</b> Store cards often have higher interest rates compared to regular credit cards. This makes them less favorable for carrying balances over time, as the cost of borrowing is higher.</List.Item>
              <List.Item><b>Usage Limitations:</b> Store cards are typically limited to use at specific retailers or within a particular retail network, whereas credit cards are more widely accepted.</List.Item>
              <List.Item><b>Terms and Conditions:</b> Credit card agreements tend to be more standardized and regulated, whereas store card terms can vary widely and may include specific store-related perks or restrictions.</List.Item>
            </List>
          </Modal>
          <Button onClick={() => setModalOpened(true)}>Example Answer</Button>
        </>
      )}
    </div>
  );
}
