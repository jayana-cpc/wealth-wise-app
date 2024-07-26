import React, { useState, useEffect } from 'react';
import { Title, Text, Input, Button, Space, Modal } from '@mantine/core';

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
      setAttempts(parseInt(localStorage.getItem('question10Attempts')) || 0);
      setFeedback(localStorage.getItem('question10Feedback') || '');
    }
  }, []);

  useEffect(() => {
    if (attempts >= 3 && correctAnswer) {
      const finalFeedback = `You have used all your attempts. The correct answer is: ${correctAnswer}`;
      setFeedback(finalFeedback);
      if (typeof window !== 'undefined') {
        localStorage.setItem('question10Feedback', finalFeedback);
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
          content: `Evaluate the following answer for the question about calculating the better pay option between an hourly wage of $15 and a salary of $30,000 per year, and considering other factors that might influence the decision beyond the pay rate. If the answer is correct, respond with "Correct". If the answer is incorrect, respond with "Incorrect" and provide a helpful response but do not reveal answer.`
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
          localStorage.setItem('question10Feedback', 'Correct! Great job!');
        }
      } else if (aiFeedback.startsWith('Incorrect')) {
        setFeedback(aiFeedback);
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        if (typeof window !== 'undefined') {
          localStorage.setItem('question10Attempts', newAttempts);
          localStorage.setItem('question10Feedback', aiFeedback);
        }
      } else {
        setFeedback('Unexpected response from AI. Please try again.');
        if (typeof window !== 'undefined') {
          localStorage.setItem('question10Feedback', 'Unexpected response from AI. Please try again.');
        }
      }

      if (attempts >= 2) {
        setCorrectAnswer(aiFeedback.replace('Incorrect. ', ''));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setFeedback('There was an error processing your answer. Please try again.');
      if (typeof window !== 'undefined') {
        localStorage.setItem('question10Feedback', 'There was an error processing your answer. Please try again.');
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
        You are offered two jobs: one that pays an hourly wage of $15 and another that offers a salary of $30,000 per year. 
        Assuming both positions require the same number of hours worked, how would you calculate the better pay option? 
        What other factors might influence your decision beyond the pay rate?
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
        <Text>
          To determine the better pay option, you would need to calculate the annual salary equivalent of the hourly wage. Assuming a standard 40-hour workweek and 52 weeks in a year, the hourly wage job would equate to $15/hour * 40 hours/week * 52 weeks/year = $31,200 per year. In this case, the hourly wage job offers a slightly higher annual income.
        </Text>
      </Modal>
    </div>
  );
}
