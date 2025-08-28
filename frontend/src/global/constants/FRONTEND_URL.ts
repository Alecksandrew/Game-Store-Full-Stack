export const PAGE_ROUTES = {
  STORE: {
    HOME: "/", 
    GAME_DETAILS: (id: string) => `/game/${id}`,
  },
  AUTH: {
    LOGIN: "/auth",
    FORGOT_PASSWORD: "/forgot-password",
    RESET_PASSWORD: "/reset-password",
    CONFIRM_EMAIL: "/confirm-email",
  },
  ACCOUNT: {
    DASHBOARD: "/my-account",
  },
};