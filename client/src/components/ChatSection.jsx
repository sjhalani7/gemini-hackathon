import { useEffect, useState } from "react";
import ChatConversation from "./ChatConversation";
import ChatInput from "./ChatInput";
import { getChatHistory, initialize, sendQuery } from "../services/geminiService";

const ChatSection = ({ messages, setMessages, mode, chatId, setInitialText }) => {
  const [loading, setLoading] = useState(false);
  let initialSetupDone = false;

  useEffect(() => {
    const initialSetup = async () => {
      if (!initialSetupDone) {
        initialSetupDone = true;
        await initialize(mode, chatId);
        const response = await getChatHistory(chatId);
        const chatHistory = response.history;
        console.log("Chat history: ", chatHistory);
        if (chatHistory.length === 1) {
          await handleSubmit("Hello, what can you help me with?");
        } else {
          // Add chat history to messages
          const historyMessages = [];
          for (let i = 1; i < chatHistory.length; i++) {
            const chat = chatHistory[i];
            const userSent = chat.role === "user";
            const text = chat.text;

            historyMessages.push({
              text: text,
              userSent: userSent,
            });
          }

          setMessages(historyMessages);
        }
      }
    };

    initialSetup();
  }, [chatId]);

  const handleSubmit = async (inputValue) => {
    console.log("Submit clicked! Input: " + inputValue);

    // Update chat initial text
    if (messages.length === 2) {
      setInitialText(chatId, inputValue);
    }

    // Immediately update the UI with the user's message
    const newMessages = [
      ...messages,
      {
        text: inputValue,
        userSent: true,
      },
    ];
    setMessages(newMessages);

    setLoading(true);

    // Call the backend service and wait for the response
    try {
      const response = await sendQuery(inputValue, chatId);
      // Add the response message to the state
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: response.response, userSent: false }, // Adjust if response structure is different
      ]);
    } catch (error) {
      console.error("Error sending query:", error);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col justify-between items-center h-full p-2 overflow-hidden">
      <ChatConversation messages={messages} loading={loading} />
      <ChatInput handleSubmit={handleSubmit} />
    </div>
  );
};

export default ChatSection;