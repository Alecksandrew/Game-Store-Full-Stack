import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router';
import './index.css'
import AuthPage from './features/auth/pages/AuthPage.tsx';
import ForgotPasswordPage from './features/auth/pages/ForgotPasswordPage.tsx';
import ResetPasswordPage from './features/auth/pages/ResetPasswordPage.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthPage />,
  },
  {
    path:"/forgot-password",
    element: <ForgotPasswordPage />
  },
  {
    path:"/reset-password",
    element: <ResetPasswordPage />
  }
])


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
