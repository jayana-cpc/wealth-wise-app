import React, { useState, useEffect } from 'react';
import { Title, Text, Input, Button, Space, Modal, List } from '@mantine/core';

const apiKey = process.env.NEXT_PUBLIC_OPEN_AI_API_KEY;

export function Question1() {
  const [userInput, setUserInput] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setAttempts(parseInt(localStorage.getItem('question12Attempts')) || 0);
      setFeedback(localStorage.getItem('question12Feedback') || '');
    }
  }, []);

  useEffect(() => {
    if (attempts >= 3 && correctAnswer) {
      const finalFeedback = `You have used all your attempts. The correct answer is: ${correctAnswer}`;
      setFeedback(finalFeedback);
      if (typeof window !== 'undefined') {
        localStorage.setItem('question12Feedback', finalFeedback);
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
          content: `Evaluate the following answer for the question about the potential reasons for a discrepancy between the total wages reported on a W-2 and the total income recorded throughout the year, and the steps to resolve the issue. If the answer is correct, respond with "Correct". If the answer is incorrect, respond with "Incorrect" and provide a helpful response but do not reveal answer.`
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
          localStorage.setItem('question12Feedback', 'Correct! Great job!');
        }
      } else if (aiFeedback.startsWith('Incorrect')) {
        setFeedback(aiFeedback);
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        if (typeof window !== 'undefined') {
          localStorage.setItem('question12Attempts', newAttempts);
          localStorage.setItem('question12Feedback', aiFeedback);
        }
      } else {
        setFeedback('Unexpected response from AI. Please try again.');
        if (typeof window !== 'undefined') {
          localStorage.setItem('question12Feedback', 'Unexpected response from AI. Please try again.');
        }
      }

      if (attempts >= 2) {
        setCorrectAnswer(aiFeedback.replace('Incorrect. ', ''));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setFeedback('There was an error processing your answer. Please try again.');
      if (typeof window !== 'undefined') {
        localStorage.setItem('question12Feedback', 'There was an error processing your answer. Please try again.');
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
        You are preparing your tax return and notice a discrepancy between the total wages reported on your W-2 and the total income you recorded throughout the year.
        Give one potential reason for this discrepancy and the steps you would take to resolve the issue.
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
        <Button onClick={() => setModalOpened(true)} color="gray">
          Example Solution
        </Button>
      )}

      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title="Example Solution"
      >
        <Text>Potential reasons for a discrepancy between your W-2 and your records include:</Text>
        <List>
          <List.Item><b>Math errors:</b> Recheck your calculations for both your records and the W-2.</List.Item>
          <List.Item><b>Missing income:</b> Ensure you have accounted for all income sources, such as tips, bonuses, or additional jobs.</List.Item>
          <List.Item><b>Employer errors:</b> Contact your employer to verify the accuracy of the W-2.</List.Item>
          <List.Item><b>Timing differences:</b> Check if the discrepancy is due to differences in pay periods or the timing of your records.</List.Item>
        </List>
        <Text>Steps to resolve the issue:</Text>
        <List>
          <List.Item>Carefully review your records and the W-2 for errors.</List.Item>
          <List.Item>Contact your employer to clarify the discrepancy.</List.Item>
          <List.Item>If the issue cannot be resolved, consider consulting a tax professional for guidance.</List.Item>
        </List>
      </Modal>
    </div>
  );
}
