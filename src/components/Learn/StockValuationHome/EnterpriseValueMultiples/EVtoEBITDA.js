import React, { useState, useEffect } from 'react';


const EVtoEBITDA = () => {
  const [loading, setLoading] = useState(true);
  const [enterpriseValueMultiple1, setEnterpriseValueMultiple1] = useState("");
  const [enterpriseValueMultiple2, setEnterpriseValueMultiple2] = useState("");
  const [enterpriseValueMultiple3, setEnterpriseValueMultiple3] = useState("");
  const [validity, setValidity] = useState("");
  const [stock1, setStock1] = useState(null);
  const [stock2, setStock2] = useState(null);
  const [stockSymbol, setStockSymbol] = useState(null);


  useEffect(() => {
    const storedSymbol = localStorage.getItem('userStock');
    const compStock1 = localStorage.getItem('competitor1');
    const compStock2 = localStorage.getItem('competitor2');
    if (storedSymbol && compStock1 && compStock2) {
      setStockSymbol(storedSymbol);
      setStock1(compStock1);
      setStock2(compStock2);
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (stock1 && stock2 && stockSymbol) {
        try {
          const response1 = await fetch(`https://financialmodelingprep.com/api/v3/key-metrics-ttm/${stock1}?limit=40&apikey=${process.env.NEXT_PUBLIC_FIN_MOD_API_KEY}`);
          const data1 = await response1.json();
          setEnterpriseValueMultiple1(data1[0].enterpriseValueOverEBITDATTM);

          const response2 = await fetch(`https://financialmodelingprep.com/api/v3/key-metrics-ttm/${stock2}?limit=40&apikey=${process.env.NEXT_PUBLIC_FIN_MOD_API_KEY}`);
          const data2 = await response2.json();
          setEnterpriseValueMultiple2(data2[0].enterpriseValueOverEBITDATTM);

          const response3 = await fetch(`https://financialmodelingprep.com/api/v3/key-metrics-ttm/${stockSymbol}?limit=40&apikey=${process.env.NEXT_PUBLIC_FIN_MOD_API_KEY}`);
          const data3 = await response3.json();
          setEnterpriseValueMultiple3(data3[0].enterpriseValueOverEBITDATTM);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [stock1, stock2, stockSymbol]);

  useEffect(() => {
    if (stockSymbol && enterpriseValueMultiple1 && enterpriseValueMultiple2 && enterpriseValueMultiple3) {
      callOpenAIAPI2(stockSymbol, enterpriseValueMultiple3, stock1, stock2, enterpriseValueMultiple1, enterpriseValueMultiple2);
    }
  }, [stockSymbol, stock1, stock2, enterpriseValueMultiple1, enterpriseValueMultiple2, enterpriseValueMultiple3]);

  const callOpenAIAPI2 = async (stockSymbol, enterpriseValueMultiple3, stock1, stock2, enterpriseValueMultiple1, enterpriseValueMultiple2) => {
    const APIBody = {
      "model": "gpt-4",
      "messages": [
        {
          "role": "system",
          "content": `Write an analysis on the inputed company's EV/EBITDA which is ${enterpriseValueMultiple3}. Compare its EV/EBITDA to these two companies ${stock1}:${enterpriseValueMultiple1} and ${stock2}:${enterpriseValueMultiple2}. Do not explain what EV/EBITDA is. Response should be 6 sentences`,
        },
        {
          "role": "user",
          "content": stockSymbol,
        },
      ],
      "temperature": 1,
      "max_tokens": 200,
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
  };

  return (
    <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      <h1>Enterprise Value over EBITDA Relative Analysis</h1>
      <div>
        {stockSymbol} EV/EBITDA: {parseFloat(enterpriseValueMultiple3).toFixed(2)}
      </div>
      <div>
        {stock1} EV/EBITDA: {parseFloat(enterpriseValueMultiple1).toFixed(2)}
      </div>
      <div>
        {stock2} EV/EBITDA: {parseFloat(enterpriseValueMultiple2).toFixed(2)}
      </div>
      {loading ? (
        <div style={{ paddingTop: '20px', height: '100%' }}>
          loading...
        </div>
      ) : (
        <div>
          {validity}
        </div>
      )}
    </div>
  );
};

export default EVtoEBITDA;