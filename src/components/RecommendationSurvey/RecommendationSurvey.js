import React, { useState } from "react";
import { marked } from "marked";
import chatStyles from "@/components/PortfolioAdvisorProps/portfolioAnalysisProp.module.css"; 

const systemMessage = {
  role: "system",
  content: `
  You are a financial advisor. Ask each question after the user replies to the previous question.
  1. Hello, My name is Wealth Wise! What is your investment goal?
  2. Have you invested before?
  3. How long do you plan to invest?
  4. What is your risk tolerance level?
  5. Are there any sectors or industries you are particularly interested in?
  6. Are you interested in income (dividends) or growth (increases in the stock price) investments?
  8. Do you have any ethical or social criteria for the companies you invest in?

  Provide 10 stock recommendations based on the inputs.
  `,
};

function MarkdownMessage({ content, direction }) {
  const createMarkup = (text) => {
    return { __html: marked(text) };
  };

  return (
    <div
      className={`${chatStyles.message} ${chatStyles[`message--${direction}`]}`}
    >
      <div
        className={chatStyles.messageContent}
        dangerouslySetInnerHTML={createMarkup(content)}
      />
    </div>
  );
}

export function RecommendationSurvey() {
  const [messages, setMessages] = useState([
    {
      message: "Hello, My name is Wealth Wise! What is your investment goal?",
      sender: "Wealth Wise",
      direction: "incoming",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: "outgoing",
      sender: "user",
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);
    setInputValue(""); // Clear the input field

    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSend(inputValue);
    }
  };

  async function processMessageToChatGPT(chatMessages) {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });
    const apiRequestBody = {
      model: "gpt-4",
      messages: [
        systemMessage,
        ...apiMessages,
      ],
      temperature: 1,
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + process.env.NEXT_PUBLIC_OPEN_AI_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            sender: "ChatGPT",
            direction: "incoming",
          },
        ]);
        setIsTyping(false);
      });
  }

  return (
    <div className={chatStyles.chatContainer}>
      <div className={chatStyles.messagesContainer}>
        {messages.map((message, i) => (
          <MarkdownMessage
            key={i}
            content={message.message}
            direction={message.direction}
          />
        ))}
        {isTyping && (
          <div className={`${chatStyles.message} ${chatStyles.messageContent}`}>
            Wealth Wise is typing...
          </div>
        )}
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
        <button
          className={chatStyles.sendButton}
          onClick={() => handleSend(inputValue)}
          disabled={isTyping}
        >
          Send
        </button>
      </div>
    </div>
  );
}
