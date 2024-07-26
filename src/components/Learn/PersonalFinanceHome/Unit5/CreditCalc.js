import { useState, useEffect, useCallback } from 'react';
import { Slider, Text, Container, Group, Box } from '@mantine/core';

const CreditCostCalculator = () => {
  const [amount, setAmount] = useState(1000);
  const [interestRate, setInterestRate] = useState(10);
  const [monthlyPayment, setMonthlyPayment] = useState(50);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  const calculateCreditCost = useCallback(() => {
    const monthlyInterestRate = interestRate / 100 / 12;
    let remainingBalance = amount;
    let totalInterestPaid = 0;
    let months = 0;

    while (remainingBalance > 0) {
      const interestForMonth = remainingBalance * monthlyInterestRate;
      const principalForMonth = monthlyPayment - interestForMonth;
      if (principalForMonth <= 0) {
        // Prevent infinite loop if monthly payment is too low
        setTotalInterest('N/A');
        setTotalTime('N/A');
        return;
      }

      remainingBalance -= principalForMonth;
      totalInterestPaid += interestForMonth;
      months++;
    }

    setTotalInterest(totalInterestPaid.toFixed(2));
    setTotalTime(months);
  }, [amount, interestRate, monthlyPayment]);

  useEffect(() => {
    calculateCreditCost();
  }, [amount, interestRate, monthlyPayment, calculateCreditCost]);

  const formatTime = (months) => {
    if (months === 'N/A') return 'N/A';
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    return `${years} years, ${remainingMonths} months`;
  };

  return (
    <Container>
      <Text size="xl" weight={700}>Credit: Calculating the Cost</Text>
      <Text size="md" mt="sm">
        Investigate how the amount borrowed, interest rate, and monthly payments affect the repayment time and cost of using credit by entering amounts in the fields below.
      </Text>
      <Box mt="lg">
        <Group direction="column" spacing="xs">
          <Text>Amount Borrowed: ${amount}</Text>
          <Slider value={amount} onChange={setAmount} min={100} max={10000} step={100} style={{ width: '100%' }} />

          <Text mt="sm">Interest Rate (%): {interestRate}</Text>
          <Slider value={interestRate} onChange={setInterestRate} min={1} max={20} step={0.1} style={{ width: '100%' }} />

          <Text mt="sm">Monthly Payment ($): {monthlyPayment}</Text>
          <Slider value={monthlyPayment} onChange={setMonthlyPayment} min={10} max={1000} step={10} style={{ width: '100%' }} />
        </Group>
      </Box>
      <Text mt="lg">Total Time: {formatTime(totalTime)}</Text>
      <Text>Total Interest: ${totalInterest}</Text>
    </Container>
  );
};

export default CreditCostCalculator;
