// FirstForce.js
import React, { useState, useEffect } from "react";

export function SecondForce() {
  const [validity, setValidity] = useState("");
  const [loading, setLoading] = useState(true);
  const [stockSymbol, setStockSymbol] = useState(null);

  useEffect(() => {
    const storedSymbol = localStorage.getItem("userStock");
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
    // Construct your APIBody using apiData from the Redux store
    const APIBody = {
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Given a company, write a concise 3 sentence analysis on the the bargaining power of buyers in the company's industry.",
        },
        {
          role: "user",
          content: stockSymbol,
        },
      ],
      temperature: 0,
      max_tokens: 100,
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
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  }

  return (
    <div>
      {loading ? ( // Render Spin when loading is true
        <div style={{ paddingTop: "20px", height: "100%" }}>Loading</div>
      ) : (
        <div style={{ border: "2px solid #4527A0", padding: "20px" }}>
          {validity}
        </div>
      )}
    </div>
  );
}
