import React, { useState, useEffect } from 'react';
import { Title, Text, Input, Button, Space, Modal } from '@mantine/core';

const apiKey = process.env.NEXT_PUBLIC_OPEN_AI_API_KEY;

export function Question3() {
  const [userInput, setUserInput] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedAttempts = parseInt(localStorage.getItem('question3Attempts')) || 0;
      const storedFeedback = localStorage.getItem('question3Feedback') || '';
      setAttempts(storedAttempts);
      setFeedback(storedFeedback);

      if (storedAttempts >= 3 && correctAnswer) {
        const finalFeedback = `You have used all your attempts. The correct answer is: ${correctAnswer}`;
        setFeedback(finalFeedback);
        localStorage.setItem('question3Feedback', finalFeedback);
      }
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
          content: `Evaluate the following answer for the question about buying a new type of cereal on sale without checking the ingredients list or pantry. If the answer is correct, respond with "Correct". If the answer is incorrect, respond with "Incorrect" and provide a helpful response but do not reveal answer..`
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
        if (typeof window !== 'undefined') {
          localStorage.setItem('question3Feedback', 'Correct! Great job!');
        }
      } else if (aiFeedback.startsWith('Incorrect')) {
        setFeedback(aiFeedback);
        setAttempts(prevAttempts => {
          const newAttempts = prevAttempts + 1;
          if (typeof window !== 'undefined') {
            localStorage.setItem('question3Attempts', newAttempts);
            localStorage.setItem('question3Feedback', aiFeedback);
          }
          return newAttempts;
        });
      } else {
        setFeedback('Unexpected response from AI. Please try again.');
        if (typeof window !== 'undefined') {
          localStorage.setItem('question3Feedback', 'Unexpected response from AI. Please try again.');
        }
      }

      if (attempts >= 2) {
        setCorrectAnswer(aiFeedback.replace('Incorrect. ', ''));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setFeedback('There was an error processing your answer. Please try again.');
      if (typeof window !== 'undefined') {
        localStorage.setItem('question3Feedback', 'There was an error processing your answer. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Title order={3}>Question 3:</Title>
      <Space h="sm" />

      <Text>
        You&rsquo;re at the grocery store and see a delicious new type of cereal on sale. You haven&rsquo;t tried it before, but the box boasts it&rsquo;s &quot;high in fiber.&quot; 
        Without checking the ingredients list or your pantry to see if you already have cereal, you toss it in your cart. 
        Is this a good financial decision?
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
        <Text>No, impulsive purchases can strain your budget, and you should check if you need it before buying.</Text>
      </Modal>
    </div>
  );
}
