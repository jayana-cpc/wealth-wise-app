import React, { useState, useEffect } from 'react';


const PricetoCashflow = () => {
  const [data, setData] = useState({
    pricefcfratio1: "",
    pricefcfratio2: "",
    pricefcfratio3: "",
    stock1: null,
    stock2: null,
    stockSymbol: null
  });
  const [loading, setLoading] = useState(true);
  const [validity, setValidity] = useState("");

  useEffect(() => {
    const storedSymbol = localStorage.getItem('userStock');
    const compStock1 = localStorage.getItem('competitor1');
    const compStock2 = localStorage.getItem('competitor2');

    if (storedSymbol && compStock1 && compStock2) {
      setData(prevData => ({
        ...prevData,
        stockSymbol: storedSymbol,
        stock1: compStock1,
        stock2: compStock2
      }));
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchRatios = async (stock, key) => {
      try {
        const response = await fetch(`https://financialmodelingprep.com/api/v3/ratios-ttm/${stock}?apikey=${process.env.NEXT_PUBLIC_FIN_MOD_API_KEY}`);
        const data = await response.json();
        return data[0].priceToFreeCashFlowsRatioTTM;
      } catch (error) {
        console.error(`Error fetching data for ${stock}:`, error);
        return null;
      }
    };

    const fetchAllRatios = async () => {
      if (data.stock1 && data.stock2 && data.stockSymbol) {
        const ratio1 = await fetchRatios(data.stock1, 'pricefcfratio1');
        const ratio2 = await fetchRatios(data.stock2, 'pricefcfratio2');
        const ratio3 = await fetchRatios(data.stockSymbol, 'pricefcfratio3');

        setData(prevData => ({
          ...prevData,
          pricefcfratio1: ratio1,
          pricefcfratio2: ratio2,
          pricefcfratio3: ratio3
        }));
        setLoading(false);
      }
    };

    fetchAllRatios();
  }, [data.stock1, data.stock2, data.stockSymbol]);

  useEffect(() => {
    if (data.stockSymbol && data.pricefcfratio3 && data.pricefcfratio1 && data.pricefcfratio2) {
      callOpenAIAPI2(data.stockSymbol, data.pricefcfratio3, data.stock1, data.stock2, data.pricefcfratio1, data.pricefcfratio2);
    }
  }, [data]);

  const callOpenAIAPI2 = async (stockSymbol, pricefcfratio3, stock1, stock2, pricefcfratio1, pricefcfratio2) => {
    const APIBody = {
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `Write an analysis on the inputed company's Price to Free Cashflow ratio which is ${pricefcfratio3}. Compare its EV/EBITDA to these two companies ${stock1}:${pricefcfratio1} and ${stock2}:${pricefcfratio2}. Do not explain what Price to Free Cashflow ratio is. Response should be 6 sentences`,
        },
        {
          role: "user",
          content: stockSymbol,
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
          "Authorization": "Bearer " + process.env.NEXT_PUBLIC_OPEN_AI_API_KEY,
        },
        body: JSON.stringify(APIBody),
      });

      const data = await response.json();
      setValidity(data.choices[0].message.content);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      <h1>Price over Free Cashflow Relative Analysis</h1>
      <div>
        {data.stockSymbol} Price/Cashflow: {parseFloat(data.pricefcfratio3).toFixed(2)}
      </div>
      <div>
        {data.stock1} Price/Cashflow: {parseFloat(data.pricefcfratio1).toFixed(2)}
      </div>
      <div>
        {data.stock2} Price/Cashflow: {parseFloat(data.pricefcfratio2).toFixed(2)}
      </div>
      <div>
        {loading ? (
          <div style={{ paddingTop: '20px', height: '100%' }}>
            Loading...
          </div>
        ) : (
          <div>{validity}</div>
        )}
      </div>
    </div>
  );
};

export default PricetoCashflow;