import React, { useState, useEffect } from 'react';
import { Title, Text, Input, Button } from '@mantine/core';

const apiKey = process.env.NEXT_PUBLIC_OPEN_AI_API_KEY;

export function Question3() {
  const [userInput, setUserInput] = useState('');
  const [attempts, setAttempts] = useState(() => {
    // Retrieve attempts from localStorage or default to 0
    return parseInt(localStorage.getItem('question3Attempts')) || 0;
  });
  const [feedback, setFeedback] = useState(() => {
    // Retrieve feedback from localStorage or default to an empty string
    return localStorage.getItem('question3Feedback') || '';
  });
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (attempts >= 3 && correctAnswer) {
      const finalFeedback = `You have used all your attempts. The correct answer is: ${correctAnswer}`;
      setFeedback(finalFeedback);
      localStorage.setItem('question3Feedback', finalFeedback);
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
          content: `Evaluate the following answer for the question about seeing an advertisement for a new investment opportunity promising high returns with minimal risk, and how the PACED model can help decide if it's a good opportunity. If the answer is correct, respond with "Correct". If the answer is incorrect, respond with "Incorrect" and provide a helpful response.`
        },
        {
          role: "user",
          content: userInput,
        },
      ],
      temperature: 1,
      max_tokens: 100,
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
        localStorage.setItem('question3Feedback', 'Correct! Great job!');
      } else if (aiFeedback.startsWith('Incorrect')) {
        setFeedback(aiFeedback);
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        localStorage.setItem('question3Attempts', newAttempts);
        localStorage.setItem('question3Feedback', aiFeedback);
      } else {
        setFeedback('Unexpected response from AI. Please try again.');
        localStorage.setItem('question3Feedback', 'Unexpected response from AI. Please try again.');
      }

      if (attempts >= 2) {
        setCorrectAnswer(aiFeedback.replace('Incorrect. ', ''));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setFeedback('There was an error processing your answer. Please try again.');
      localStorage.setItem('question3Feedback', 'There was an error processing your answer. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Title order={3}>Question 3:</Title>
      <Text>
        You see an advertisement for a new investment opportunity promising high returns with minimal risk. However, you've never invested before 
        and don't know much about the financial market.
        How can the PACED model help you decide if this is a good opportunity?
      </Text>
      <Input 
        placeholder="Input your answer" 
        value={userInput}
        onChange={(event) => setUserInput(event.currentTarget.value)}
      />
      <Button onClick={handleSubmit} disabled={loading || attempts >= 3}>
        {loading ? 'Loading...' : 'Submit'}
      </Button>
      {feedback && (
        <Text color={attempts >= 3 ? 'red' : 'blue'}>{feedback}</Text>
      )}
    </div>
  );
}

