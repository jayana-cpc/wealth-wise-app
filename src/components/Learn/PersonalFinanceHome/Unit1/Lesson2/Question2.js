import React, { useState, useEffect } from 'react';
import { Title, Text, Input, Button } from '@mantine/core';

const apiKey = process.env.NEXT_PUBLIC_OPEN_AI_API_KEY;

export function Question2() {
  const [userInput, setUserInput] = useState('');
  const [attempts, setAttempts] = useState(() => {
    // Retrieve attempts from localStorage or default to 0
    return parseInt(localStorage.getItem('question2Attempts')) || 0;
  });
  const [feedback, setFeedback] = useState(() => {
    // Retrieve feedback from localStorage or default to an empty string
    return localStorage.getItem('question2Feedback') || '';
  });
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (attempts >= 3 && correctAnswer) {
      const finalFeedback = `You have used all your attempts. The correct answer is: ${correctAnswer}`;
      setFeedback(finalFeedback);
      localStorage.setItem('question2Feedback', finalFeedback);
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
          content: `Evaluate the following answer for the question about being overwhelmed by student loan debt and considering different repayment options using the PACED decision-making process. If the answer is correct, respond with "Correct". If the answer is incorrect, respond with "Incorrect" and provide a helpful response.`
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
      <Text>
        You're overwhelmed by your student loan debt and considering different repayment options. Some options offer lower monthly payments but extend the repayment period, 
        while others have higher monthly payments but are paid off quicker. 
        What PACED step(s) should you take FIRST to approach this decision effectively?
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

