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
import MajorSelectionPage from './views/MajorSelectionPage';
import MinorSelectionPage from './views/MinorSelectionPage';
import TutorChatPage from './views/TutorChatPage';
import AdvisorChatPage from './views/AdvisorChatPage';

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
    path: "/tutor-chat",
    element: <TutorChatPage />,
  },
  {
    path: "/advisor-chat",
    element: <AdvisorChatPage />,
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
