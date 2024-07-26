"use client";

import React, { useState } from 'react';
import { Container, Table, Input, Button, Text, Group } from '@mantine/core';

const Budget = () => {
  const [earnings, setEarnings] = useState('');
  const [otherIncome, setOtherIncome] = useState('');
  const [expenses, setExpenses] = useState({
    car: '',
    rent: '',
    food: '',
    clothing: '',
    utilities: '',
    entertainment: '',
    misc: '',
    savings: '',
  });

  const handleExpenseChange = (e) => {
    const { name, value } = e.target;
    setExpenses({ ...expenses, [name]: value });
  };

  const generateRandomIncome = () => {
    const randomEarnings = (Math.random() * 5000).toFixed(2);
    const randomOtherIncome = (Math.random() * 1000).toFixed(2);
    setEarnings(randomEarnings);
    setOtherIncome(randomOtherIncome);
  };

  const totalIncome = parseFloat(earnings) + parseFloat(otherIncome);
  const totalExpenses = Object.values(expenses).reduce((acc, curr) => acc + (parseFloat(curr) || 0), 0);
  const remainingIncome = totalIncome - totalExpenses;

  return (
    <Container>
      <Table>
        <thead>
          <tr>
            <th colSpan="2">Budget</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Income</td>
            <td></td>
          </tr>
          <tr>
            <td>Earnings</td>
            <td>${earnings}</td>
          </tr>
          <tr>
            <td>Other (gifts, etc.)</td>
            <td>${otherIncome}</td>
          </tr>
          <tr>
            <td>Total Income</td>
            <td>${totalIncome.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Expenses</td>
            <td></td>
          </tr>
          {Object.keys(expenses).map((expense) => (
            <tr key={expense}>
              <td>{expense.charAt(0).toUpperCase() + expense.slice(1)}</td>
              <td>
                <Input
                  type="number"
                  name={expense}
                  value={expenses[expense]}
                  onChange={handleExpenseChange}
                  placeholder="$"
                  styles={{ input: { width: '100%' } }}
                />
              </td>
            </tr>
          ))}
          <tr>
            <td>Total Expenses</td>
            <td>${totalExpenses.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Total Income Less Expenses</td>
            <td>${remainingIncome.toFixed(2)}</td>
          </tr>
        </tbody>
      </Table>
      <Group position="right" mt="md">
        <Button
          variant="outline"
          onClick={() => setExpenses({
            car: '',
            rent: '',
            food: '',
            clothing: '',
            utilities: '',
            entertainment: '',
            misc: '',
            savings: '',
          })}
        >
          Clear
        </Button>
        <Button onClick={generateRandomIncome}>Generate Random Income</Button>
        <Button>Submit</Button>
      </Group>
    </Container>
  );
};

export default Budget;
