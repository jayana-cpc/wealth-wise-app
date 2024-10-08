import React, { useState, useEffect } from "react";

export function ValProposition() {
  const [validity, setValidity] = useState("");
  const [stockSymbol, setStockSymbol] = useState(null);

  useEffect(() => {
    const storedSymbol = localStorage.getItem("userStock");
    if (storedSymbol) {
      setStockSymbol(storedSymbol);
    }
  }, []);

  useEffect(() => {
    if (stockSymbol) {
      callOpenAIAPI(stockSymbol);
    }
  }, [stockSymbol]);

  async function callOpenAIAPI(stockSymbol) {
    const APIBody = {
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Give a 1-2 sentence description of the company's (stock symbol) value proposition.",
        },
        {
          role: "user",
          content: stockSymbol,
        },
      ],
      temperature: 0,
      max_tokens: 1024,
    };

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + process.env.NEXT_PUBLIC_OPEN_AI_API_KEY,
          },
          body: JSON.stringify(APIBody),
        },
      );

      const data = await response.json();
      setValidity(data.choices[0].message.content);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return <div>{validity}</div>;
}

export default ValProposition;
