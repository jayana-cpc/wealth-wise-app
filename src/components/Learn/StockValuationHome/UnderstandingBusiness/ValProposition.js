import React, { useState, useEffect } from 'react';
import {Card, Skeleton} from '@mantine/core';


export function ValProposition(){
  const [validity, setValidity] = useState("");
  const [loading, setLoading] = useState(true);
  const [stockSymbol, setStockSymbol] = useState(null);

  useEffect(() => {
    const storedSymbol = localStorage.getItem('userStock');
    if (storedSymbol) {
      setStockSymbol(storedSymbol);
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (stockSymbol) {
      callOpenAIAPI(stockSymbol);
    }
  }, [stockSymbol]);

  async function callOpenAIAPI(stockSymbol) {
    const APIBody = {
      "model": "gpt-4",
      "messages": [
        {
          "role": "system",
          "content": "Give a 1-2 sentence description of the company's (stock symbol) value proposition.",
        },
        {
          "role": "user",
          "content": stockSymbol,
        },
      ],
      "temperature": 0,
      "max_tokens": 1024,
    };

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + process.env.NEXT_PUBLIC_OPEN_AI_API_KEY,
        },
        body: JSON.stringify(APIBody),
      });

      const data = await response.json();
      setValidity(data.choices[0].message.content);
      setLoading(false);

    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  }


  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Card
        title="Company Value Proposition"
        bordered={false}
        style={{
          width: 450,
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          border: '1px solid',
          borderRadius: '15px'
        }}
        headStyle={{
          backgroundColor: '#20243c',
          color: '#fff',
          fontSize: '25px',
          fontWeight: '600',
          textAlign: 'center',
        }}
        bodyStyle={{
          padding: '20px',
          display: loading ? 'flex' : 'block',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#181c34',
          color: 'white'

        }}
        loading={loading}
      >
        {loading ? <Skeleton active /> : validity}
      </Card>
    </div>
  );
};

