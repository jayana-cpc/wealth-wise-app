import { useState } from 'react';
import { Text, TextInput, Button, Container, Paper, Group, Box, Notification } from '@mantine/core';
import { marked } from 'marked';

export function PortfolioAnalysisProp() {
  const [messages, setMessages] = useState([
    {
      message: "Hello, My name is Wealth Wise, your personal financial advisor!",
      sender: "Wealth Wise",
      direction: 'incoming'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');

  function MarkdownRenderer({ markdown }) {
    const createMarkup = (text) => {
      return { __html: marked(text) };
    };

    return <div dangerouslySetInnerHTML={createMarkup(markdown)} />;
  }

  const handleSend = async () => {
    const message = inputValue.trim();
    if (message === '') return;

    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user"
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);
    setInputValue('');

    setIsTyping(true);

    try {
      const portfolio = localStorage.getItem('portfolio') || '';
      const response = await fetch('http://localhost:5000/api/get-answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: message, portfolio: portfolio }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const data = await response.json();
      console.info(data);
      setMessages((prevMessages) => [...prevMessages, {
        message: data.answer,
        sender: "Wealth Wise",
        direction: "incoming"
      }]);
      setIsTyping(false);
    } catch (error) {
      console.error('Error occurred during API request:', error);
      setIsTyping(false);
      // Handle the error or show a message to the user
    }
  };

  return (
    <Container size="sm">
      <Paper shadow="xs" p="md" withBorder>
        <Box mb="md">
          <Text size="lg" weight={500}>Portfolio Analysis</Text>
        </Box>
        <Box style={{ height: '400px', overflowY: 'auto', marginBottom: '16px' }}>
          {messages.map((message, i) => (
            <Box key={i} style={{ textAlign: message.direction === 'outgoing' ? 'right' : 'left' }}>
              <Paper shadow="xs" p="sm" withBorder>
                <MarkdownRenderer markdown={message.message.trim()} />
              </Paper>
            </Box>
          ))}
          {isTyping && (
            <Notification loading title="Wealth Wise is typing" disallowClose />
          )}
        </Box>
        <Group align="flex-end">
          <TextInput
            placeholder="Type message here"
            value={inputValue}
            onChange={(event) => setInputValue(event.currentTarget.value)}
            style={{ flex: 1 }}
          />
          <Button onClick={handleSend}>Send</Button>
        </Group>
      </Paper>
    </Container>
  );
}