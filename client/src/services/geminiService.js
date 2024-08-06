import axios from 'axios';

const baseURL = "http://127.0.0.1:5000";
let chatId = "abc1"; // Initialize chatId to store the chat session id

const api = axios.create({
  baseURL: baseURL,
  withCredentials: true, // Ensure credentials are sent with requests
  headers: {
    'Content-Type': 'application/json',
    'Accept': '*/*'
  }
});

const initialize = async () => {
  try {
    console.log("Initializing...");
    const response = await api.post("/initialize");
    chatId = response.data.chat_id; // Save the chat ID from the response
    console.log('Initialization Response:', response.data);
    console.log('Cookies after initialization:', document.cookie); // Log cookies
  } catch (error) {
    console.error('Error making POST request:', error.response ? error.response.data : error.message);
  }
};

const sendQuery = async (query) => {
  try {
    if (!chatId) {
      console.error('Error: Chat ID is not initialized.');
      return;
    }
    
    console.log("Sending query...");
    console.log("Query:", query);

    const response = await api.post("/ask", { chat_id: chatId, query });
    console.log('Query Response:', response.data);
    console.log('Cookies after sending query:', document.cookie); // Log cookies

    return response.data; // Return the response data

  } catch (error) {
    console.error('Error making POST request:', error.response ? error.response.data : error.message);
    throw error; // Re-throw the error so it can be caught in handleSubmit
  }
};


export { initialize, sendQuery };
