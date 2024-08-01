import React, { useState, useEffect } from "react";
import { marked } from "marked";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import chatStyles from "./portfolioAnalysisProp.module.css";

// Custom message component to render markdown
function MarkdownMessage({ content, direction }) {
  const createMarkup = (text) => {
    return { __html: marked(text) };
  };

  return (
    <div
      className={`cs-message cs-message--${direction} ${chatStyles.message}`}
    >
      <div
        className={`${chatStyles.messageContent} ${direction === "incoming" ? chatStyles.incoming : chatStyles.outgoing}`}
      >
        <div dangerouslySetInnerHTML={createMarkup(content)} />
      </div>
    </div>
  );
}

export function PortfolioAnalysisProp() {
  const [messages, setMessages] = useState([
    {
      message:
        "Hello, My name is Wealth Wise, your personal financial advisor!",
      sender: "Wealth Wise",
      direction: "incoming",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [portfolio, setPortfolio] = useState(null);

  useEffect(() => {
    async function fetchAndSetPortfolio() {
      const user = JSON.parse(localStorage.getItem("user"));
      console.info("User data from localStorage:", user);

      if (!user) {
        console.error("User data is missing from localStorage.");
        // Fallback to guestPortfolio from localStorage immediately if user data is missing
        const guestPortfolio = JSON.parse(
          localStorage.getItem("guestPortfolio"),
        );
        if (guestPortfolio) {
          console.info(
            "Using guestPortfolio data from localStorage:",
            guestPortfolio,
          );
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
        const guestPortfolio = JSON.parse(
          localStorage.getItem("guestPortfolio"),
        );
        if (guestPortfolio) {
          console.info(
            "Using guestPortfolio data from localStorage:",
            guestPortfolio,
          );
          setPortfolio(guestPortfolio);
        } else {
          console.error("guestPortfolio data is missing from localStorage.");
        }
      }
    }

    fetchAndSetPortfolio();
  }, []);

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
          message:
            "Sorry, I could not retrieve your portfolio information. Please make sure you have built a portfolio in the customization page.",
          sender: "Wealth Wise",
          direction: "incoming",
        },
      ]);
      setIsTyping(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/get-answer", {
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
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          message: data.answer,
          sender: "Wealth Wise",
          direction: "incoming",
        },
      ]);
      setIsTyping(false);
    } catch (error) {
      console.error("Error occurred during API request:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          message:
            "An error occurred while processing your request. Please try again later.",
          sender: "Wealth Wise",
          direction: "incoming",
        },
      ]);
      setIsTyping(false);
    }
  };

  return (
    <MainContainer className={chatStyles.mainContainer}>
      <ChatContainer className={chatStyles.chatContainer}>
        <MessageList
          className={chatStyles.messageList}
          typingIndicator={
            isTyping && (
              <TypingIndicator
                content="Wealth Wise is typing..."
                className={chatStyles.typingIndicator}
              />
            )
          }
        >
          {messages.map((message, i) => (
            <MarkdownMessage
              key={i}
              content={message.message}
              direction={
                message.direction === "incoming" ? "incoming" : "outgoing"
              }
              sender={message.sender}
            />
          ))}
        </MessageList>
        <MessageInput
          placeholder="Type message here"
          value={inputValue}
          onChange={(val) => setInputValue(val)}
          onSend={handleSend}
          sendButton={true}
          className={chatStyles.messageInput}
        />
      </ChatContainer>
    </MainContainer>
  );
}

async function fetchPortfolioInfo(user) {
  console.info("User data sent to fetchPortfolioInfo:", user);

  const res = await fetch("http://localhost:5000/api/get-portfolio-info", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user }),
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const result = await res.json();
  return result;
}
