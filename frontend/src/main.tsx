import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import AuthPage from "./features/auth/pages/AuthPage.tsx";
import ForgotPasswordPage from "./features/auth/pages/ForgotPasswordPage.tsx";
import ResetPasswordPage from "./features/auth/pages/ResetPasswordPage.tsx";
import EmailConfirmationPage from "./features/auth/pages/EmailConfirmationPage.tsx";
import MyAccountPage from "./features/myAccount/pages/MyAccountPage.tsx";
import ProtectedRoute from "./global/routes/ProtectedRoutes.tsx";
import AuthLayout from "./features/auth/pages/AuthLayout.tsx";

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/",
        element: <AuthPage />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPasswordPage />,
      },
      {
        path: "/reset-password",
        element: <ResetPasswordPage />,
      },
      {
        path: "/confirm-email",
        element: <EmailConfirmationPage />,
      },
    ],
  },
  {
    path: "/my-account",
    element: (
      <ProtectedRoute>
        <MyAccountPage />
      </ProtectedRoute>
    ),
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
