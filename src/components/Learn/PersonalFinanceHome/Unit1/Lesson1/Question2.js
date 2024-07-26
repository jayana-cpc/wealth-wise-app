import React, { useState, useEffect } from 'react';
import { Title, Text, Input, Button, Space, Modal } from '@mantine/core';

const apiKey = process.env.NEXT_PUBLIC_OPEN_AI_API_KEY;

export function Question2() {
  const [userInput, setUserInput] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);

  // This useEffect hook will run only on the client-side
  useEffect(() => {
    const storedAttempts = parseInt(localStorage.getItem('question2Attempts')) || 0;
    const storedFeedback = localStorage.getItem('question2Feedback') || '';
    setAttempts(storedAttempts);
    setFeedback(storedFeedback);

    if (storedAttempts >= 3 && correctAnswer) {
      const finalFeedback = `You have used all your attempts. The correct answer is: ${correctAnswer}`;
      setFeedback(finalFeedback);
      localStorage.setItem('question2Feedback', finalFeedback);
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
          content: `Evaluate the following answer for the question about investing in a new "hot stock" based on a friend's recommendation without doing any research. If the answer is correct, respond with "Correct". If the answer is incorrect, respond with "Incorrect" and provide a helpful response but do not reveal answer.`
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
        localStorage.setItem('question2Feedback', 'Correct! Great job!');
      } else if (aiFeedback.startsWith('Incorrect')) {
        setFeedback(aiFeedback);
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        localStorage.setItem('question2Attempts', newAttempts);
        localStorage.setItem('question2Feedback', aiFeedback);
      } else {
        setFeedback('Unexpected response from AI. Please try again.');
        localStorage.setItem('question2Feedback', 'Unexpected response from AI. Please try again.');
      }

      if (attempts >= 2) {
        setCorrectAnswer(aiFeedback.replace('Incorrect. ', ''));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setFeedback('There was an error processing your answer. Please try again.');
      localStorage.setItem('question2Feedback', 'There was an error processing your answer. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Title order={3}>Question 2:</Title>
      <Space h="sm" />

      <Text>
        Your friend convinces you to invest in a new &quot;hot stock&quot; that everyone&rsquo;s talking about. 
        You haven&rsquo;t done any research on the company, but you trust your friend&rsquo;s judgment. 
        How should you proceed?
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
        <Text>Do your own research on the company&apos;s financials and future prospects before making any investment decisions.</Text>
      </Modal>
    </div>
  );
}
