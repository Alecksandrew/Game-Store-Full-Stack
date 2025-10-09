// src/global/constants/FRONTEND_URL.ts
export const PAGE_ROUTES = {
  STORE: {
    HOME: "/",
    GAME_DETAILS_FUNCTION: (id: string) => `/games/${id}`,
    GENRES: "/games/genres/:genre",
    WISHLIST: "/wishlist",
    CART: "/cart",
    CHECKOUT: "/checkout",
  },
  AUTH: {
    LOGIN: "/auth",
    FORGOT_PASSWORD: "/forgot-password",
    RESET_PASSWORD: "/reset-password",
    CONFIRM_EMAIL: "/confirm-email",
  },
  ACCOUNT:  "/my-account",
  ADMIN: {
    DASHBOARD: "/admin",
  },
};