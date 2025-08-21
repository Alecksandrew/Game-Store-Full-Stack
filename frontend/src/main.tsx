import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router';
import './index.css'
import AuthPage from './features/auth/pages/AuthPage.tsx';
import ForgotPasswordPage from './features/forgotPassword/pages/ForgotPasswordPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthPage />,
  },
  {
    path:"/forgot-password",
    element: <ForgotPasswordPage />
  }
])


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
