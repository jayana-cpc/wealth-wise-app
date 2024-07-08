import { useState } from 'react';
import { marked } from 'marked';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  MessageInput,
  TypingIndicator
} from '@chatscope/chat-ui-kit-react';
import chatStyles from '@/components/PortfolioAdvisorProps/portfolioAnalysisProp.module.css';

// Define Wealth Wise Survey Questions
const systemMessage = {
  "role": "system", "content": `
  You are a financial advisor. Ask each question after the user replies to the previous question.
  1. Hello, My name is Wealth Wise! What is your investment goal?
  2. Have you invested before?
  3. How long do you plan to invest?
  4. What is your risk tolerance level?
  5. Are there any sectors or industries you are particularly interested in?
  6. Are you interested in income (dividends) or growth (increases in the stock price) investments?
  8. Do you have any ethical or social criteria for the companies you invest in?

  Provide 10 stock recommendations based on the inputs.
  `
};

// Custom message component to render markdown
function MarkdownMessage({ content, direction, sender }) {
  const createMarkup = (text) => {
    return { __html: marked(text) };
  };

  return (
    <div className={`cs-message cs-message--${direction} ${chatStyles.message} ${direction === 'incoming' ? chatStyles.incoming : chatStyles.outgoing}`}>
      <div className={`${chatStyles.messageContent} ${direction === 'incoming' ? chatStyles.incoming : chatStyles.outgoing}`}>
        <div dangerouslySetInnerHTML={createMarkup(content)} />
      </div>
    </div>
  );
}

// Survey Function
export function RecommendationSurvey() {
  const [messages, setMessages] = useState([
    {
      message: "Hello, My name is Wealth Wise! What is your investment goal?",
      sender: "Wealth Wise",
      direction: "incoming"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');

  // Handle User Messages
  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user"
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);

    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  // Handle Wealth Wise Responses
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
      "model": "gpt-4",
      "messages": [
        systemMessage,  // The system message DEFINES the logic of our chatGPT
        ...apiMessages // The messages from our chat with ChatGPT
      ],
      "temperature": 1,
    };

    await fetch("https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + process.env.NEXT_PUBLIC_OPEN_AI_API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(apiRequestBody)
      }).then((data) => {
        return data.json();
      }).then((data) => {
        console.log(data);
        setMessages([...chatMessages, {
          message: data.choices[0].message.content,
          sender: "ChatGPT",
          direction: "incoming"
        }]);
        setIsTyping(false);
      });
  }

  return (
    <MainContainer className={chatStyles.mainContainer}>
      <ChatContainer className={chatStyles.chatContainer}>
        <MessageList className={chatStyles.messageList} typingIndicator={isTyping && <TypingIndicator content="Wealth Wise is typing..." className={chatStyles.typingIndicator} />}
        >
          {messages.map((message, i) => (
            <MarkdownMessage
              key={i}
              content={message.message}
              direction={message.direction === 'incoming' ? 'incoming' : 'outgoing'}
              sender={message.sender}
            />
          ))}
        </MessageList>
        <MessageInput
          placeholder="Type message here"
          value={inputValue}
          onChange={val => setInputValue(val)}
          onSend={handleSend} 
          sendButton={true}
          className={chatStyles.messageInput}
        />
      </ChatContainer>
    </MainContainer>
  );
}