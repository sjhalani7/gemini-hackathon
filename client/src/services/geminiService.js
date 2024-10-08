import axios from 'axios';

const baseURL = "http://127.0.0.1:5000";

const api = axios.create({
  baseURL: baseURL,
  withCredentials: true, // Ensure credentials are sent with requests
  headers: {
    'Content-Type': 'application/json',
    'Accept': '*/*'
  }
});

const initialize = async (mode, chat_id, course) => {
  try {
    console.log("Initializing...");
    console.log("Mode: ", mode);
    console.log("Chat id: ", chat_id);
    console.log("Course: ", course);

    const response = await api.post("/initialize", { mode, chat_id, class: course });
    console.log('Initialization Response:', response.data);
    console.log('Cookies after initialization:', document.cookie); // Log cookies
  } catch (error) {
    console.error('Error making POST request:', error.response ? error.response.data : error.message);
  }
};

const sendQuery = async (query, chat_id, mode) => {
  try {
    if (chat_id === null) {
      console.error('Error: Chat ID is not initialized.');
      return;
    }
    
    console.log("Sending query...");
    console.log("Chat id: ", chat_id);
    console.log("Query:", query);
    console.log("Mode: ", mode)

    const response = await api.post("/ask", { chat_id, query, mode });
    console.log('Query Response:', response.data);

    return response.data; // Return the response data

  } catch (error) {
    console.error('Error making POST request:', error.response ? error.response.data : error.message);
    throw error; // Re-throw the error so it can be caught in handleSubmit
  }
};

const getChatHistory = async (chat_id, mode) => {
  try {
    console.log("Getting chat history...");
    console.log("Chat id: ", chat_id);
    console.log("Mode: ", mode);

    const response = await api.get(`/chat-history?chat_id=${chat_id}&mode=${mode}`);
    console.log('History Response:', response.data);

    return response.data; // Return the response data

  } catch (error) {
    console.error('Error making GET request:', error.response ? error.response.data : error.message);
    throw error;
  }
};

const getChatIds = async (mode) => {
  try {
    console.log("Getting chat ids...");
    console.log("Mode: ", mode);

    const response = await api.get(`/chat-ids?mode=${mode}`);
    console.log('Response:', response.data);

    return response.data; // Return the response data

  } catch (error) {
    console.error('Error making GET request:', error.response ? error.response.data : error.message);
    throw error;
  }
}

const getNextId = async() => {
  try {
    const response = await api.get('/next-id');
  } catch (error) {
    console.error('Error making GET request:', error.response ? error.response.data : error.message);
    throw error;
  }
}



export { initialize, sendQuery, getChatHistory, getChatIds };
