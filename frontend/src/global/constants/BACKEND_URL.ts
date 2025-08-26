const API_BASE_URL = "https://localhost:7205";

export const API_ROUTES = {
  AUTH: {
    REGISTER: `${API_BASE_URL}/api/Auth/register`,
    LOGIN: `${API_BASE_URL}/api/Auth/login`,
    LOGOUT: `${API_BASE_URL}/api/Auth/logout`,
    REFRESH_TOKEN: `${API_BASE_URL}/api/Auth/refresh`,
    CONFIRM_EMAIL: `${API_BASE_URL}/api/Auth/confirm-email`,
    FORGOT_PASSWORD: `${API_BASE_URL}/api/Auth/forgot-password`,
    RESET_PASSWORD: `${API_BASE_URL}/api/Auth/reset-password`,
  },
  ACCOUNT: {
    ME: `${API_BASE_URL}/api/account/me`,
  },
  GAMES: {
    POPULAR: {
      DETAILED_INFOS: `${API_BASE_URL}/api/Games/popular`,
      SUMMARY_INFOS:`${API_BASE_URL}/api/Games/popular-summary`,
    }
  }
};