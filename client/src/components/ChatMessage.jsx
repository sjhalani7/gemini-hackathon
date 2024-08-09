import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../auth/firebaseConfig';
import geminiLogo from '../assets/gemini.png';

const ChatMessage = ({ message }) => {
  const { text, userSent } = message;
  const [user] = useAuthState(auth);

  return (
    <div className={`flex items-center w-full ${userSent ? 'user-message' : 'bot-message'}`}>
      {!userSent && 
        <img
          src={geminiLogo}
          alt="Profile"
          className='w-8 h-8 rounded-full border p-1'
        />
      }
      
      <div className={`message px-4 py-3 m-2`}>
        <ReactMarkdown>
          {text}
        </ReactMarkdown>
      </div>

      {userSent && 
        <img
          src={user.photoURL}
          alt="Profile"
          className='w-8 h-8 rounded-full mr-3'
        />
      }
    </div>
  );
};

export default ChatMessage;
