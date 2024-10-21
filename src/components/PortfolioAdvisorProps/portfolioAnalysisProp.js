import React, { useState, useEffect } from "react";
import { marked } from "marked";
import chatStyles from "./portfolioAnalysisProp.module.css"; // Importing the CSS module
import { Modal, Button, Tooltip, Grid } from "@mantine/core"; // Import the Tooltip component
const URL = process.env.NEXT_PUBLIC_BACKEND_URL 

const apiKey = process.env.NEXT_PUBLIC_OPEN_AI_API_KEY;

function MarkdownMessage({ content, direction }) {
  const createMarkup = (text) => {
    return { __html: marked(text) };
  };

  return (
    <div className={`${chatStyles.message} ${chatStyles[`message--${direction}`]}`}>
      <div
        className={chatStyles.messageContent}
        dangerouslySetInnerHTML={createMarkup(content)}
      />
    </div>
  );
}

export function PortfolioAnalysisProp() {
  const [messages, setMessages] = useState([
    {
      message: "Hello, My name is Wealth Wise, your personal financial advisor!",
      sender: "Wealth Wise",
      direction: "incoming",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [portfolio, setPortfolio] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  // Helper function to get the storage key based on the user's login state
  const getStorageKey = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.uid) {
      return `messages_${user.uid}`;
    }
    return "messages_guest";
  };

  // Load previous messages from localStorage when the component mounts
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedMessages = localStorage.getItem(getStorageKey());
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
      }
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(getStorageKey(), JSON.stringify(messages));
    }
  }, [messages]);

  // Load the portfolio information
  useEffect(() => {
    async function fetchAndSetPortfolio() {
      if (typeof window === "undefined") return;

      const user = JSON.parse(localStorage.getItem("user"));
      console.info("User data from localStorage:", user);

      if (!user) {
        console.error("User data is missing from localStorage.");
        // Fallback to guestPortfolio from localStorage immediately if user data is missing
        const guestPortfolio = JSON.parse(localStorage.getItem("guestPortfolio"));
        if (guestPortfolio) {
          console.info("Using guestPortfolio data from localStorage:", guestPortfolio);
          setPortfolio(guestPortfolio);
        } else {
          console.error("guestPortfolio data is missing from localStorage.");
        }
        return;
      }

      try {
        const portfolioData = await fetchPortfolioInfo(user);
        setPortfolio(portfolioData);
      } catch (error) {
        console.error("Error fetching portfolio info:", error);

        // Fallback to guestPortfolio from localStorage if fetch fails
        const guestPortfolio = JSON.parse(localStorage.getItem("guestPortfolio"));
        if (guestPortfolio) {
          console.info("Using guestPortfolio data from localStorage:", guestPortfolio);
          setPortfolio(guestPortfolio);
        } else {
          console.error("guestPortfolio data is missing from localStorage.");
        }
      }
    }

    fetchAndSetPortfolio();
  }, []);

  // Handle sending a message
  const handleSend = async (message) => {
    if (message.trim() === "") return;

    const newMessage = {
      message,
      direction: "outgoing",
      sender: "user",
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);
    setInputValue(""); // Clear the input field

    setIsTyping(true);

    if (!portfolio) {
      console.error("Portfolio info is not set.");
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          message: "Sorry, I could not retrieve your portfolio information. Please make sure you have built a portfolio in the customization page.",
          sender: "Wealth Wise",
          direction: "incoming",
        },
      ]);
      setIsTyping(false);
      return;
    }

    try {
      const response = await fetch(`http://${URL}/api/get-answer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: message, portfolio: portfolio }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const data = await response.json();
      console.info(data);
      setMessages((prevMessages) => {
        const updatedMessages = [
          ...prevMessages,
          {
            message: data.answer,
            sender: "Wealth Wise",
            direction: "incoming",
          },
        ];
        // Save the updated messages to localStorage
        localStorage.setItem(getStorageKey(), JSON.stringify(updatedMessages));
        return updatedMessages;
      });
      setIsTyping(false);
    } catch (error) {
      console.error("Error occurred during API request:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          message: "An error occurred while processing your request. Please try again later.",
          sender: "Wealth Wise",
          direction: "incoming",
        },
      ]);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSend(inputValue);
    }
  };

  const clearChat = () => {
    setMessages([]);
    if (typeof window !== "undefined") {
      localStorage.removeItem(getStorageKey());
    }
  };

  const analyzeDiversification = (portfolio) => {
    // Analyze the portfolio diversification
    const sectorCounts = portfolio.reduce((acc, stock) => {
      const sector = stock.sector || "Unknown";
      if (!acc[sector]) {
        acc[sector] = 0;
      }
      acc[sector]++;
      return acc;
    }, {});

    const portfolioSymbols = portfolio.map(stock => stock.symbol);

    let diversificationMessage = "Your portfolio diversification analysis:\n";
    for (const sector in sectorCounts) {
      diversificationMessage += `- ${sector}: ${sectorCounts[sector]} stocks\n`;
    }

    const suggestions = [];
    if (sectorCounts["Unknown"] > 0) {
      suggestions.push("Consider identifying the sectors for unknown stocks.");
    }

    const totalStocks = portfolio.length;
    const threshold = totalStocks / 3; // Example threshold for diversification

    for (const sector in sectorCounts) {
      if (sectorCounts[sector] > threshold) {
        suggestions.push(`Consider reducing exposure to the ${sector} sector.`);
      }
    }

    if (suggestions.length === 0) {
      suggestions.push("Your portfolio is well diversified.");
    } else {
      suggestions.push("Consider diversifying your portfolio by investing in the following sectors:");
      const recommendedSectors = [
        { sector: "Technology", companies: [{ name: "Apple", symbol: "AAPL" }, { name: "Microsoft", symbol: "MSFT" }] },
        { sector: "Healthcare", companies: [{ name: "Johnson & Johnson", symbol: "JNJ" }, { name: "Pfizer", symbol: "PFE" }] },
        { sector: "Financials", companies: [{ name: "JPMorgan Chase", symbol: "JPM" }, { name: "Goldman Sachs", symbol: "GS" }] },
        { sector: "Consumer Discretionary", companies: [{ name: "Amazon", symbol: "AMZN" }, { name: "Tesla", symbol: "TSLA" }] },
        { sector: "Energy", companies: [{ name: "ExxonMobil", symbol: "XOM" }, { name: "Chevron", symbol: "CVX" }] },
        { sector: "Utilities", companies: [{ name: "NextEra Energy", symbol: "NEE" }, { name: "Duke Energy", symbol: "DUK" }] },
        { sector: "Real Estate", companies: [{ name: "Prologis", symbol: "PLD" }, { name: "Simon Property Group", symbol: "SPG" }] },
        { sector: "Consumer Staples", companies: [{ name: "Procter & Gamble", symbol: "PG" }, { name: "Coca-Cola", symbol: "KO" }] },
        { sector: "Industrials", companies: [{ name: "Boeing", symbol: "BA" }, { name: "Union Pacific", symbol: "UNP" }] },
      ];

      recommendedSectors.forEach(({ sector, companies }) => {
        if (!sectorCounts[sector] || sectorCounts[sector] <= threshold) {
          const filteredCompanies = companies.filter(company => !portfolioSymbols.includes(company.symbol));
          if (filteredCompanies.length > 0) {
            suggestions.push(`- ${sector}: ${filteredCompanies.map(company => `${company.name} (${company.symbol})`).join(", ")}`);
          }
        }
      });
    }

    diversificationMessage += "\nSuggestions to diversify your portfolio:\n";
    suggestions.forEach((suggestion, index) => {
      diversificationMessage += `${index + 1}. ${suggestion}\n`;
    });

    return diversificationMessage;
  };

  const handleDiversificationAnalysis = () => {
    setIsTyping(true);
    setIsModalOpen(false);

    let currentPortfolio = portfolio;
    if (!currentPortfolio) {
      const guestPortfolio = JSON.parse(localStorage.getItem("guestPortfolio"));
      if (guestPortfolio) {
        console.info("Using guestPortfolio data from localStorage:", guestPortfolio);
        currentPortfolio = guestPortfolio;
      } else {
        console.error("guestPortfolio data is missing from localStorage.");
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            message: "Sorry, I could not retrieve your portfolio companies information. Please make sure you have built a portfolio in the customization page.",
            sender: "Wealth Wise",
            direction: "incoming",
          },
        ]);
        setIsTyping(false);
        return;
      }
    }

    const diversificationAnalysis = analyzeDiversification(currentPortfolio);

    // Append the diversification analysis result to the messages state
    setMessages((prevMessages) => {
      const updatedMessages = [
        ...prevMessages,
        {
          message: diversificationAnalysis,
          sender: "Wealth Wise",
          direction: "incoming",
        },
      ];
      // Save the updated messages to localStorage
      localStorage.setItem(getStorageKey(), JSON.stringify(updatedMessages));
      return updatedMessages;
    });

    setIsTyping(false);
  };

  const handleNewsAnalysis = async () => {
    setIsTyping(true);
    setIsModalOpen(false);

    let currentPortfolio = portfolio;
    if (!currentPortfolio) {
      const guestPortfolio = JSON.parse(localStorage.getItem("guestPortfolio"));
      if (guestPortfolio) {
        console.info("Using guestPortfolio data from localStorage:", guestPortfolio);
        currentPortfolio = guestPortfolio;
      } else {
        console.error("guestPortfolio data is missing from localStorage.");
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            message: "Sorry, I could not retrieve your portfolio companies information. Please make sure you have built a portfolio in the customization page.",
            sender: "Wealth Wise",
            direction: "incoming",
          },
        ]);
        setIsTyping(false);
        return;
      }
    }

    const companies = currentPortfolio.map(item => item.symbol);

    try {
      const newsData = await Promise.all(
        companies.map(async (ticker) => {
          const response = await fetch(`https://api.polygon.io/v2/reference/news?ticker=${ticker}&limit=3&apiKey=${process.env.NEXT_PUBLIC_POLYGON_API_KEY}`);
          const data = await response.json();
          return {
            company: ticker,
            news: data.results,
          };
        })
      );

      const prompt = newsData.map((item) => {
        return `Company: ${item.company}\nNews:\n${item.news.map(newsItem => `- ${newsItem.title}`).join("\n")}`;
      }).join("\n\n");

      const APIBody = {
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "Provide a summary analysis on current news sentiment for each company based on the provided news headlines.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 1,
        max_tokens: 1000,
      };

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + apiKey,
        },
        body: JSON.stringify(APIBody),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const data = await response.json();
      const analysis = data.choices[0].message.content;

      // Append the news analysis result to the messages state
      setMessages((prevMessages) => {
        const updatedMessages = [
          ...prevMessages,
          {
            message: analysis,
            sender: "Wealth Wise",
            direction: "incoming",
          },
        ];
        // Save the updated messages to localStorage
        localStorage.setItem(getStorageKey(), JSON.stringify(updatedMessages));
        return updatedMessages;
      });
    } catch (error) {
      console.error("Error occurred during API request:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          message: "An error occurred while processing your request. Please try again later.",
          sender: "Wealth Wise",
          direction: "incoming",
        },
      ]);
    }

    setIsTyping(false);
  };

  return (
    <div className={chatStyles.chatContainer}>
      <div className={chatStyles.messagesContainer}>
        {messages.map((msg, index) => (
          <MarkdownMessage key={index} content={msg.message} direction={msg.direction} />
        ))}
        {isTyping && <div className={`${chatStyles.message} ${chatStyles.messageContent}`}>Wealth Wise is typing...</div>}
      </div>
      <div className={chatStyles.inputContainer}>
        <input
          type="text"
          className={chatStyles.inputField}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
        />
        <div className={chatStyles.buttonContainer}>
          <Button
            className={chatStyles.sendButton}
            onClick={() => handleSend(inputValue)}
            disabled={isTyping}
          >
            Send
          </Button>
          <Button
            className={chatStyles.sendButton} // You can add more specific styling if needed
            onClick={() => setIsModalOpen(true)}
          >
            Choose a Task
          </Button>
          <Button
            className={chatStyles.sendButton} // You can add more specific styling if needed
            onClick={clearChat}
          >
            Clear Chat
          </Button>
        </div>
      </div>
      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Choose a task: "
      >
        <div>
          <Grid>
            <Grid.Col>
              <Tooltip label="Get an analysis of current financial news">
                <Button onClick={handleNewsAnalysis}>
                  News Analysis
                </Button>
              </Tooltip>
            </Grid.Col>
            <Grid.Col>
              <Tooltip label="Analyze your portfolio's diversification">
                <Button onClick={handleDiversificationAnalysis}>
                  Diversification Analysis
                </Button>
              </Tooltip>
            </Grid.Col>
          </Grid>
        </div>
      </Modal>
    </div>
  );
}
