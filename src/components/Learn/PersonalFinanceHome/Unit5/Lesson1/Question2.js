import React, { useState, useEffect } from 'react';
import { Title, Text, Input, Button, Space, Modal, List } from '@mantine/core';

const apiKey = process.env.NEXT_PUBLIC_OPEN_AI_API_KEY;

export function AutoLoanVsDealership() {
  const [userInput, setUserInput] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setAttempts(parseInt(localStorage.getItem('autoLoanVsDealershipAttempts')) || 0);
      setFeedback(localStorage.getItem('autoLoanVsDealershipFeedback') || '');
    }
  }, []);

  useEffect(() => {
    if (attempts >= 3 && correctAnswer) {
      const finalFeedback = `You have used all your attempts. The correct answer is: ${correctAnswer}`;
      setFeedback(finalFeedback);
      if (typeof window !== 'undefined') {
        localStorage.setItem('autoLoanVsDealershipFeedback', finalFeedback);
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
          content: `Evaluate the following answer for the question about comparing the advantages and disadvantages of obtaining an auto loan from a bank or credit union versus financing directly through a car dealership. If the answer is correct, respond with "Correct". If the answer is incorrect, respond with "Incorrect" and provide a helpful response.`
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
          localStorage.setItem('autoLoanVsDealershipFeedback', 'Correct! Great job!');
        }
      } else if (aiFeedback.startsWith('Incorrect')) {
        setFeedback(aiFeedback);
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        if (typeof window !== 'undefined') {
          localStorage.setItem('autoLoanVsDealershipAttempts', newAttempts);
          localStorage.setItem('autoLoanVsDealershipFeedback', aiFeedback);
        }
      } else {
        setFeedback('Unexpected response from AI. Please try again.');
        if (typeof window !== 'undefined') {
          localStorage.setItem('autoLoanVsDealershipFeedback', 'Unexpected response from AI. Please try again.');
        }
      }

      if (attempts >= 2) {
        setCorrectAnswer(aiFeedback.replace('Incorrect. ', ''));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setFeedback('There was an error processing your answer. Please try again.');
      if (typeof window !== 'undefined') {
        localStorage.setItem('autoLoanVsDealershipFeedback', 'There was an error processing your answer. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Title order={3}>Auto Loan vs. Dealership Financing</Title>
      <Space h="sm" />

      <Text>
        Imagine you are planning to buy your first car and are exploring financing options. Compare the advantages and disadvantages of obtaining an auto loan from a bank or credit union versus financing directly through a car dealership. Consider factors such as interest rates, loan terms, and overall cost over the life of the loan.
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
              When deciding between obtaining an auto loan from a bank or credit union versus financing through a car dealership, consider the following factors:
            </Text>
            <Text><b>Auto Loan from Bank or Credit Union:</b></Text>
            <List withPadding>
              <List.Item><b>Interest Rates:</b> Banks and credit unions often offer competitive interest rates on auto loans, especially to their members or customers with good credit histories. This can result in lower overall borrowing costs.</List.Item>
              <List.Item><b>Loan Terms:</b> Loans from banks and credit unions typically come with flexible repayment terms and may offer options for pre-approval, allowing buyers to negotiate with dealers as cash buyers.</List.Item>
              <List.Item><b>Financial Benefits:</b> Establishing a relationship with a bank or credit union through an auto loan can lead to potential benefits such as improved credit scores and future borrowing opportunities.</List.Item>
            </List>
            <Text><b>Auto Financing through Dealership:</b></Text>
            <List withPadding>
              <List.Item><b>Convenience:</b> Financing through a dealership is convenient because it&apos;s usually done on-site during the car purchase process. Dealers often have relationships with multiple lenders, offering a range of financing options.</List.Item>
              <List.Item><b>Promotional Offers:</b> Dealerships may run promotions such as zero-percent financing or cash-back incentives, which can provide savings if you qualify.</List.Item>
              <List.Item><b>Negotiation Potential:</b> Dealerships may be more willing to negotiate the price of the car if you use their financing, as it adds another profit stream for them.</List.Item>
            </List>
          </Modal>
          <Button onClick={() => setModalOpened(true)}>Example Answer</Button>
        </>
      )}
    </div>
  );
}
