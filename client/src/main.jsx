import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import LoginPage from './views/LoginPage';
import GeminiSelectionPage from './views/GeminiSelectionPage';
import CourseSelectionPage from './views/CourseSelectionPage';
import ChatPage from './views/ChatPage';
import MajorSelectionPage from './views/MajorSelectionPage';
import MinorSelectionPage from './views/MinorSelectionPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/gemini-selection",
    element: <GeminiSelectionPage />,
  },
  {
    path: "/course-selection",
    element: <CourseSelectionPage />,
  },
  {
    path: "/chat",
    element: <ChatPage />,
  },
  {
    path: "/major-selection",
    element: <MajorSelectionPage />
  },
  {
    path: "/minor-selection",
    element: <MinorSelectionPage />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
