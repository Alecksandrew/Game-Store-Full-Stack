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
import { PAGE_ROUTES } from "./global/constants/FRONTEND_URL.ts";
import HomePage from "./features/Home/page/HomePage.tsx";
import GameDetailsPage from "./features/Details/pages/GameDetailsPage.tsx";
import { WishlistProvider } from "./features/Wishlist/context/WishlistProvider.tsx";
import WishlistPage from "./features/Wishlist/pages/WishlistPage.tsx";
import CategoryPage from "./features/Category/pages/CategoryPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/games/:id",
    element: <GameDetailsPage />,
  },
  {
    path:"/wishlist",
    element:<WishlistPage/>
  },
  {
    path: PAGE_ROUTES.STORE.GENRES,
    element: <CategoryPage />,
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: PAGE_ROUTES.AUTH.LOGIN,
        element: <AuthPage />,
      },
      {
        path: PAGE_ROUTES.AUTH.FORGOT_PASSWORD,
        element: <ForgotPasswordPage />,
      },
      {
        path: PAGE_ROUTES.AUTH.RESET_PASSWORD,
        element: <ResetPasswordPage />,
      },
      {
        path: PAGE_ROUTES.AUTH.CONFIRM_EMAIL,
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
    <WishlistProvider>
      <RouterProvider router={router} />
    </WishlistProvider>
  </StrictMode>
);
